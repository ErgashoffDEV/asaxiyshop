UZ = 'uz'
RU = 'ru'
EN = 'en'

LANGUAGES = (
    (UZ, "๐บ๐ฟ O'zbekcha"),
    (RU, "๐ท๐บ ะ ัััะบะธะน"),
    (EN, "๐บ๐ธ English"),
)


def language_by_name(name):
    for key, lang_name in LANGUAGES:
        if name == lang_name:
            return key


def language_by_key(key):
    for _key, name in LANGUAGES:
        if key == _key:
            return name


def language_names():
    return [l for _, l in LANGUAGES]
