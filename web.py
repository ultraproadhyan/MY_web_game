"""
Complete Quiz Application with Admin Panel and WhatsApp Integration
- User registration with code verification
- Complete quiz with all questions
- WhatsApp payment integration
- Full admin panel for question management
- Score tracking and results
"""

import os
import secrets
import hashlib
import csv
import random
from datetime import datetime
from flask import Flask, render_template_string, request, redirect, session, url_for

app = Flask(__name__)
app.secret_key = secrets.token_hex(32)
app.config['DATA_DIR'] = 'secure_data'
os.makedirs(app.config['DATA_DIR'], exist_ok=True)

# File paths
QUESTIONS_FILE = os.path.join(app.config['DATA_DIR'], 'questions.txt')
CODES_FILE = os.path.join(app.config['DATA_DIR'], 'codes.txt')
PLAYERS_FILE = os.path.join(app.config['DATA_DIR'], 'players.csv')
ADMIN_FILE = os.path.join(app.config['DATA_DIR'], 'admin.txt')

# WhatsApp configuration
WHATSAPP_NUMBER = "917694993234"
PAYMENT_AMOUNT = "10"
WHATSAPP_MESSAGE = f"I want to buy a quiz code for ₹{PAYMENT_AMOUNT}"

def initialize_files():
    """Initialize all required files with default data"""
    if not os.path.exists(QUESTIONS_FILE):
        with open(QUESTIONS_FILE, 'w', encoding='utf-8') as f:
            f.write("Language: English\nWhat is 2+2?\n3\n4\n5\n6\n2\n")
            f.write("\nLanguage: Hindi\n3+3 क्या है?\n5\n6\n7\n8\n2\n")

    if not os.path.exists(PLAYERS_FILE):
        with open(PLAYERS_FILE, 'w', encoding='utf-8') as f:
            f.write("Timestamp,Name,Number,Age,Code,Answers,Score,TimeTaken,IP\n")

    if not os.path.exists(ADMIN_FILE):
        with open(ADMIN_FILE, 'w') as f:
            f.write(f"admin,{hashlib.sha256('admin123'.encode()).hexdigest()}")

    if not os.path.exists(CODES_FILE):
        with open(CODES_FILE, 'w') as f:
            f.write("# Valid Codes\nTEST123\n")

initialize_files()

def get_all_questions():
    """Get all questions from file"""
    questions = []
    try:
        with open(QUESTIONS_FILE, 'r', encoding='utf-8') as f:
            content = f.read().strip().split('\n')
        
        current_question = {}
        for line in content:
            line = line.strip()
            if not line:
                continue
                
            if line.startswith("Language:"):
                if current_question and validate_question(current_question):
                    questions.append(current_question)
                current_question = {
                    'lang': line.split(":", 1)[1].strip(),
                    'q': '',
                    'options': [],
                    'correct': None
                }
            elif not current_question.get('q'):
                current_question['q'] = line
            elif len(current_question['options']) < 4:
                current_question['options'].append(line)
            elif current_question['correct'] is None:
                try:
                    current_question['correct'] = int(line)
                except ValueError:
                    current_question['correct'] = 1
        
        if current_question and validate_question(current_question):
            questions.append(current_question)
            
    except Exception as e:
        print(f"Error loading questions: {e}")
    return questions

def validate_question(question):
    """Validate question structure"""
    return (question.get('lang') and question.get('q') and 
            len(question.get('options', [])) == 4 and 
            question.get('correct') is not None)

def save_question(lang, question, options, correct):
    """Save new question to file"""
    try:
        with open(QUESTIONS_FILE, 'a', encoding='utf-8') as f:
            f.write(f"\nLanguage: {lang}\n{question}\n")
            f.write("\n".join(options) + f"\n{correct}\n")
        return True
    except Exception as e:
        print(f"Error saving question: {e}")
        return False

def save_player(data):
    """Save player data to CSV"""
    try:
        with open(PLAYERS_FILE, 'a', encoding='utf-8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(data)
        return True
    except Exception as e:
        print(f"Error saving player: {e}")
        return False

def validate_code(code):
    """Check if code exists"""
    try:
        with open(CODES_FILE, 'r') as f:
            for line in f:
                if line.strip() == code:
                    return True
        return False
    except Exception as e:
        print(f"Error validating code: {e}")
        return False

def generate_code():
    """Generate and save new code"""
    code = f"CODE{random.randint(1000, 9999)}"
    try:
        with open(CODES_FILE, 'a') as f:
            f.write(f"{code}\n")
        return code
    except Exception as e:
        print(f"Error generating code: {e}")
        return None

def check_admin(username, password):
    """Verify admin credentials"""
    try:
        with open(ADMIN_FILE) as f:
            stored_user, stored_hash = f.read().strip().split(',')
            return (username == stored_user and 
                    hashlib.sha256(password.encode()).hexdigest() == stored_hash)
    except Exception as e:
        print(f"Error checking admin: {e}")
        return False

BASE_HTML = '''<!DOCTYPE html>
<html>
<head>
    <title>Quiz Game</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }}
        .card {{
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }}
        input, button, select {{
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
        }}
        button {{
            background: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            font-weight: bold;
        }}
        button:hover {{ background: #0056b3; }}
        .options {{ margin: 15px 0; }}
        .option {{ margin: 10px 0; padding: 8px; background: #f9f9f9; border-radius: 4px; }}
        .error {{ color: red; }}
        .success {{ color: green; }}
        .progress {{ margin: 20px 0; text-align: center; }}
        .nav-buttons {{ display: flex; gap: 10px; }}
        .nav-buttons button {{ flex: 1; }}
    </style>
</head>
<body>
    <div class="card">
        {content}
    </div>
</body>
</html>'''

# User Routes
@app.route('/')
def home():
    """Home page with code entry"""
    session.clear()
    content = '''
    <h2>Welcome to Quiz Game</h2>
    <p>Test your knowledge and win prizes!</p>
    <div style="display: flex; gap: 10px;">
        <a href="/get_code"><button>Get Code (Pay ₹10)</button></a>
        <form action="/verify_code" method="post" style="flex-grow: 1;">
            <input type="text" name="code" placeholder="Enter code" required>
            <button type="submit">Start Quiz</button>
        </form>
    </div>
    '''
    return render_template_string(BASE_HTML.format(content=content))

@app.route('/get_code')
def get_code():
    """Generate code and redirect to WhatsApp"""
    code = generate_code()
    if code:
        whatsapp_url = f"https://wa.me/{WHATSAPP_NUMBER}?text={WHATSAPP_MESSAGE}"
        return redirect(whatsapp_url)
    return redirect(url_for('home'))

@app.route('/verify_code', methods=['POST'])
def verify_code():
    """Validate user code"""
    code = request.form.get('code', '').strip().upper()
    if validate_code(code):
        session['code'] = code
        session['current_question'] = 0
        session['answers'] = []
        return redirect(url_for('user_details'))
    content = '''
    <h3>Invalid Code</h3>
    <p>The code you entered is not valid. Please try again.</p>
    <a href="/"><button>Back to Home</button></a>
    '''
    return render_template_string(BASE_HTML.format(content=content))

@app.route('/user_details')
def user_details():
    """User details form"""
    if 'code' not in session:
        return redirect(url_for('home'))
    content = '''
    <h3>Enter Your Details</h3>
    <form method="post" action="/start_quiz">
        <input type="text" name="name" placeholder="Full Name" required>
        <input type="tel" name="number" placeholder="Phone Number" required>
        <input type="number" name="age" placeholder="Age" min="10" max="100" required>
        <button type="submit">Start Quiz</button>
    </form>
    '''
    return render_template_string(BASE_HTML.format(content=content))

@app.route('/start_quiz', methods=['POST'])
def start_quiz():
    """Start quiz with user details"""
    session['player'] = {
        'name': request.form.get('name', '').strip(),
        'number': request.form.get('number', '').strip(),
        'age': request.form.get('age', '').strip(),
        'code': session.get('code'),
        'start_time': datetime.now().timestamp(),
        'ip': request.remote_addr
    }
    return redirect(url_for('show_question'))

@app.route('/question')
def show_question():
    """Show current question"""
    if 'player' not in session or 'current_question' not in session:
        return redirect(url_for('home'))
    
    questions = get_all_questions()
    if not questions:
        return render_template_string(BASE_HTML.format(content="<h3>No questions available</h3>"))
    
    current_q = session['current_question']
    if current_q >= len(questions):
        return redirect(url_for('submit_quiz'))
    
    question = questions[current_q]
    
    options_html = ''.join(
        f'<div class="option"><input type="radio" name="answer" value="{opt}" id="opt{i}" required> '
        f'<label for="opt{i}">{opt}</label></div>'
        for i, opt in enumerate(question['options']))
    
    progress = f'<div class="progress">Question {current_q+1} of {len(questions)}</div>'
    
    if current_q == len(questions) - 1:
        button = '<button type="submit" style="background: #28a745;">Submit Quiz</button>'
    else:
        button = '<button type="submit">Next Question</button>'
    
    content = f'''
    {progress}
    <h3>Question ({question['lang']})</h3>
    <p>{question['q']}</p>
    <form method="post" action="/process_answer">
        <div class="options">{options_html}</div>
        <div class="nav-buttons">
            {button}
        </div>
    </form>
    '''
    return render_template_string(BASE_HTML.format(content=content))

@app.route('/process_answer', methods=['POST'])
def process_answer():
    """Process answer and move to next question"""
    if 'player' not in session or 'current_question' not in session:
        return redirect(url_for('home'))
    
    questions = get_all_questions()
    current_q = session['current_question']
    
    if current_q >= len(questions):
        return redirect(url_for('submit_quiz'))
    
    answer = request.form.get('answer', '')
    session['answers'].append(answer)
    session['current_question'] += 1
    
    return redirect(url_for('show_question'))

@app.route('/submit_quiz')
def submit_quiz():
    """Calculate and show final results"""
    if 'player' not in session or 'answers' not in session:
        return redirect(url_for('home'))
    
    questions = get_all_questions()
    if len(session['answers']) != len(questions):
        return redirect(url_for('show_question'))
    
    score = 0
    results = []
    for i, (question, answer) in enumerate(zip(questions, session['answers'])):
        is_correct = answer == question['options'][question['correct'] - 1]
        results.append({
            'question': question['q'],
            'answer': answer,
            'correct': is_correct,
            'correct_answer': question['options'][question['correct'] - 1]
        })
        if is_correct:
            score += 1
    
    time_taken = int(datetime.now().timestamp() - session['player']['start_time'])
    total_questions = len(questions)
    percentage = int((score / total_questions) * 100)
    
    save_player([
        datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        session['player']['name'],
        session['player']['number'],
        session['player']['age'],
        session['player']['code'],
        ",".join(session['answers']),
        f"{score}/{total_questions}",
        time_taken,
        session['player']['ip']
    ])
    
    results_html = ''.join(
        f'<div style="margin-bottom: 15px; padding: 10px; border: 1px solid {"green" if r["correct"] else "red"}; border-radius: 4px;">'
        f'<p><strong>Q:</strong> {r["question"]}</p>'
        f'<p><strong>Your Answer:</strong> {r["answer"]}</p>'
        f'<p><strong>Correct Answer:</strong> {r["correct_answer"]}</p>'
        f'<p><strong>Result:</strong> {"✓ Correct" if r["correct"] else "✗ Incorrect"}</p>'
        f'</div>'
        for r in results)
    
    content = f'''
    <h3>Quiz Completed!</h3>
    <p>You scored: <strong>{score}/{total_questions}</strong> ({percentage}%)</p>
    <p>Time taken: {time_taken} seconds</p>
    <div style="margin: 20px 0;">
        <h4>Question-wise Results:</h4>
        {results_html}
    </div>
    <a href="/"><button>Back to Home</button></a>
    '''
    
    session.clear()
    return render_template_string(BASE_HTML.format(content=content))

# Admin Routes
@app.route('/admin', methods=['GET', 'POST'])
def admin_login():
    """Admin login page"""
    error = ''
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()
        
        if check_admin(username, password):
            session['admin'] = True
            return redirect(url_for('admin_dashboard'))
        error = '<p class="error">Invalid username or password</p>'
    
    content = f'''
    <h3>Admin Login</h3>
    {error}
    <form method="post">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
    </form>
    '''
    return render_template_string(BASE_HTML.format(content=content))

@app.route('/admin/dashboard')
def admin_dashboard():
    """Admin dashboard"""
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    
    questions = get_all_questions()
    players = []
    try:
        with open(PLAYERS_FILE, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            players = list(reader)
    except Exception as e:
        print(f"Error reading players: {e}")
    
    questions_html = ''.join(
        f'<div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">'
        f'<h4>{q["lang"]}: {q["q"]}</h4>'
        f'<ol>{"".join(f"<li>{opt}</li>" for opt in q["options"])}</ol>'
        f'<p><strong>Correct Answer:</strong> {q["options"][q["correct"]-1]}</p>'
        f'<a href="/admin/delete/{i}"><button style="background: #dc3545;">Delete</button></a>'
        f'</div>'
        for i, q in enumerate(questions))
    
    players_html = ''.join(
        f'<tr>'
        f'<td>{p["Name"]}</td>'
        f'<td>{p["Number"]}</td>'
        f'<td>{p["Score"]}</td>'
        f'<td>{p["TimeTaken"]}s</td>'
        f'</tr>'
        for p in players[-10:])  # Show last 10 players
    
    content = f'''
    <h2>Admin Dashboard</h2>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
            <h3>Current Questions ({len(questions)})</h3>
            {questions_html if questions else "<p>No questions found</p>"}
            
            <hr>
            <h3>Add New Question</h3>
            <form method="post" action="/admin/add_question">
                <input type="text" name="lang" placeholder="Language (e.g., English)" required>
                <input type="text" name="question" placeholder="Question" required>
                <input type="text" name="opt1" placeholder="Option 1" required>
                <input type="text" name="opt2" placeholder="Option 2" required>
                <input type="text" name="opt3" placeholder="Option 3" required>
                <input type="text" name="opt4" placeholder="Option 4" required>
                <select name="correct" required>
                    <option value="">Select Correct Option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                </select>
                <button type="submit">Add Question</button>
            </form>
        </div>
        
        <div>
            <h3>Recent Players ({len(players)})</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #007bff; color: white;">
                        <th style="padding: 8px; text-align: left;">Name</th>
                        <th style="padding: 8px; text-align: left;">Number</th>
                        <th style="padding: 8px; text-align: left;">Score</th>
                        <th style="padding: 8px; text-align: left;">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {players_html if players else "<tr><td colspan='4'>No players yet</td></tr>"}
                </tbody>
            </table>
            
            <hr>
            <h3>Add New Code</h3>
            <form method="post" action="/admin/add_code">
                <input type="text" name="code" placeholder="Enter code" required>
                <button type="submit">Add Code</button>
            </form>
        </div>
    </div>
    
    <hr>
    <a href="/admin/logout"><button style="background: #6c757d;">Logout</button></a>
    '''
    return render_template_string(BASE_HTML.format(content=content))

@app.route('/admin/add_question', methods=['POST'])
def admin_add_question():
    """Add new question"""
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    
    lang = request.form.get('lang', '').strip()
    question = request.form.get('question', '').strip()
    options = [
        request.form.get('opt1', '').strip(),
        request.form.get('opt2', '').strip(),
        request.form.get('opt3', '').strip(),
        request.form.get('opt4', '').strip()
    ]
    correct = request.form.get('correct', '').strip()
    
    if not all([lang, question]) or any(not opt for opt in options) or not correct:
        return render_template_string(BASE_HTML.format(
            content='<h3 class="error">All fields are required</h3>'
                   '<a href="/admin/dashboard"><button>Back to Dashboard</button></a>'))
    
    try:
        correct = int(correct)
        if correct < 1 or correct > 4:
            raise ValueError
    except ValueError:
        return render_template_string(BASE_HTML.format(
            content='<h3 class="error">Correct option must be between 1-4</h3>'
                   '<a href="/admin/dashboard"><button>Back to Dashboard</button></a>'))
    
    if save_question(lang, question, options, correct):
        return redirect(url_for('admin_dashboard'))
    return render_template_string(BASE_HTML.format(
        content='<h3 class="error">Error saving question</h3>'
               '<a href="/admin/dashboard"><button>Back to Dashboard</button></a>'))

@app.route('/admin/add_code', methods=['POST'])
def admin_add_code():
    """Add new valid code"""
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    
    code = request.form.get('code', '').strip().upper()
    if not code:
        return redirect(url_for('admin_dashboard'))
    
    try:
        with open(CODES_FILE, 'a') as f:
            f.write(f"{code}\n")
        return redirect(url_for('admin_dashboard'))
    except Exception as e:
        print(f"Error adding code: {e}")
        return redirect(url_for('admin_dashboard'))

@app.route('/admin/delete/<int:qid>')
def admin_delete_question(qid):
    """Delete question"""
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    
    questions = get_all_questions()
    if qid < 0 or qid >= len(questions):
        return redirect(url_for('admin_dashboard'))
    
    try:
        with open(QUESTIONS_FILE, 'w', encoding='utf-8') as f:
            for i, q in enumerate(questions):
                if i != qid:
                    f.write(f"Language: {q['lang']}\n{q['q']}\n")
                    f.write("\n".join(q['options']) + f"\n{q['correct']}\n\n")
        return redirect(url_for('admin_dashboard'))
    except Exception as e:
        print(f"Error deleting question: {e}")
        return render_template_string(BASE_HTML.format(
            content='<h3 class="error">Error deleting question</h3>'
                   '<a href="/admin/dashboard"><button>Back to Dashboard</button></a>'))

@app.route('/admin/logout')
def admin_logout():
    """Admin logout"""
    session.clear()
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)