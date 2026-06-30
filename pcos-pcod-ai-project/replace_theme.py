import os
import re

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The replacements we want to make
    replacements = [
        (r'neon-card', 'aura-card'),
        (r'neon-button-(pink|blue|purple|green|yellow)', 'aura-button'),
        (r'neon-button', 'aura-button'),
        (r'neon-border-(pink|blue|purple|green|yellow)', 'medical-border border-teal-500/20'),
        (r'neon-border', 'medical-border'),
        (r'neon-input', 'aura-input'),
        (r'neon-text-(pink|blue|purple|green|yellow|aqua)', 'text-teal-400'),
        (r'neon-text', 'text-teal-400'),
        (r'text-neon-purple', 'text-teal-600'),
        (r'text-neon-pink', 'text-sky-500'),
        (r'text-neon-blue', 'text-teal-400'),
        (r'text-neon-aqua', 'text-teal-300'),
        (r'text-neon-green', 'text-emerald-400'),
        (r'bg-neon-purple', 'bg-teal-600'),
        (r'bg-neon-pink', 'bg-sky-500'),
        (r'bg-neon-blue', 'bg-teal-400'),
        (r'text-aqua-blue', 'text-teal-400'),
        (r'PCOS Guardian', 'AuraHealth'),
    ]

    new_content = content
    for pattern, repl in replacements:
        new_content = re.sub(pattern, repl, new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

def process_dir(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(('.js', '.jsx', '.css')):
                replace_in_file(os.path.join(root, file))

if __name__ == '__main__':
    process_dir('c:/Users/moinu/Downloads/AI-Powered-Early-Detection-and-Lifestyle-Recommendations-for-PCOS-and-PCOD-main/AI-Powered-Early-Detection-and-Lifestyle-Recommendations-for-PCOS-and-PCOD-main/frontend/src')
