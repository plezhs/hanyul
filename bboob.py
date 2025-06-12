import random

def generate_random_korean_word():
    initial_consonants = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ"
    vowels = "ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ"
    final_consonants = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ"  # 종성도 포함
    
    word_length = random.randint(2, 5)
    word = ""
    
    for _ in range(word_length):
        initial_consonant = random.choice(initial_consonants)
        vowel = random.choice(vowels)
        final_consonant = random.choice(final_consonants)
        syllable = chr(0xAC00 + (initial_consonants.index(initial_consonant) * 21 + vowels.index(vowel)) * 28 + final_consonants.index(final_consonant))
        word += syllable
    
    return word

# Example usage
if __name__ == "__main__":
    for i in range(1,101):
        print(generate_random_korean_word())
