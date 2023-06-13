class Journal:
    def __init__(self):
        self.entries = {}
        self.count = 0
    
    def add_entry(self, text):
        self.count += 1
        c = self.count
        entry = f'{c}: {text}'
        self.entries[c] = entry
        return c

    def remove_entry(self, index: int):
        del self.entries[index]
    
    def to_string(self):
        return '\n'.join(self.entries.values())

    def save_to_file(journal, filename):
        file = open(filename, 'w')
        file.write(journal.to_string())
        file.close()

j = Journal()
j.add_entry('I cried today')
j.add_entry('I ate a bug')
print(f'Journal entries:\n{j.to_string()}')

file = r'../../../temp/journalpy.txt'
j.save_to_file(j, file)