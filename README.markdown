Bank pracy
==========

Projekt ma na celu umożliwienie publikacji ogłoszeń o pracę dla wolontariuszy
przez sekretariat ŚDM, oraz dać możliwość zgłaszania się wolontariuszom chętnych
wykonania któregoś z zadań. Zarówno ogłoszenia jak i zgłoszenia do nich są
publiczne widoczne dla wszystkich. Autoryzacja wolontariuszy odbywa się poprzez
serwis Facebook.

Dodawanie ogłoszeń
------------------

Aby móc dodać ogłoszenie na stronie trzeba posiadać [konto w serwisie
github.com](<https://github.com/join>) oraz być częścią [zespołu
Krakow2016](<https://github.com/orgs/Krakow2016/people>) (wymaganie
zaproszenie). Osoby posiadające konto, ale niebędące częścią zespołu mogą
jedynie sugerować zmiany za pomocą mechanizmu [Pull
Request](<https://help.github.com/articles/using-pull-requests>), które mogą
zostać zaakceptowane lub odrzucone przez członka zespołu.

### Tryb online

Najprostszy sposób na dodanie nowego lub edycję istniejącego ogłoszenia jest
poprzez stronę internetową
<https://github.com/Krakow2016/jobs/tree/gh-pages/\_posts>.

**Edycja:** Wybierz z listy dowolny plik z rozszerzeniem `.markdown`, a
następnie kliknij ikonkę ołówka nad prawym górnym rogiem podgądu pliku. Teraz
możesz edytować treść pliku. Aby zapisać wykonaną pracę, kliknij przycisk
`Commit changes`

**Dodawanie:** Znajdź symbol `+` w górnej części strony, zaraz za ścieżką
katalogów w której się znajdujemy ('jobs/\_posts/') i kliknij go. Teraz możesz
napisać treść ogłoszenia. Aby zapisać wykonaną pracę, kliknij przycisk `Commit
new file`. Pamiętaj, że każde ogłoszenie musi zawierać na początku sekcję
metadanych! Czytaj dalej żeby dowiedzieć się więcej.

### Tryb offline

Alternatywną metodą edycji treści strony jest ściągnięcie jej na lokalny komputer i edycja odpowiednich plików w dowolnym edytorze tekstów (najlepiej ze wsparciem składni markdown np.: [markdownpad](http://markdownpad.com/)). Aby tego dokonać:

* Ściągnij i zainstaluj program GitHub do synchronizacji plików na system [Windows](https://windows.github.com/) lub [Mac](https://mac.github.com/),
* zaloguj się podając swój login i hasło,
* skonfiguruj git-a klikając dalej,
* krok importu możemy pominąć,
* dodaj nowy projekt klikając w ikonkę plusa w lewym górnym rogu głównego ekranu programu, a następnie wybierz zakładkę "Clone",
* jeżeli należymy do grupy Krakow2016, powinien pojawić się projekt o nazwie `jobs`,
* zaznaczamy go i klikamy "Clone jobs", następnie wybieramy katalog do którego chcemy skopiować projekt.
* Uff... nareszcie mamy nasze pliki :-) Najtrudniejsze już za nami! Możemy teraz wejść do wybranego wcześniej katalogu i dodawać lub edytować pliki w katalogu `_posts` w dowolnym edytorze tekstu.
* Po skończonej pracy wracamy do programu Github. Powyżej listy z ostatnimi zmianami (History), powinien pojawić się pasek "Uncommited changes", a obok "Show" - klikamy w niego.
* Po prawej stronie pojawi nam się podsumowanie zmian które chcemy dokonać. Wystarczy teraz, że opiszemy te zmiany jednym zdaniem w polu "Summary" i odblokuje się nam przycisk "Commit to gh-pages".
* Kiedy go wciśniemy, ostatnim krokiem będzie synchronizacja projektu, czyli przesłanie naszej pracy na serwer (od teraz musimy być już online). Synchronizacja odbywa się poprzez kliknięcie przycisku "Sync" w prawym górnym rogu.
* Kilkanaście sekund po synchronizacji zmiany będą widoczne dla wszystkich na stronie :-)

Metadane
--------

Każde ogłoszenie musi zawrzeć na początku sekcję metadanych (nawet jeżeli ma ona
być pusta), która zaczyna się i kończy ciągiem 3 minusów w osobnej linii
(`---`).

Dane jakie powinny znaleźć się w tej sekcji to: * `layout` - powinien mieć
zawsze wartość `post`, * `title` - tytuł ogłoszenia, * `date` - data dodania, *
`category` lub `categories` - kategoria lub kategorie oddzielone spacją, \*
`team_count` - liczba osób potrzebna do wykonania zadania.

Format danych w tej sekcji to: jedna para (klucz i wartość) w jednej linijce
oddzielone dwukropkiem, np.: `layout: post`. W przypadku kategorii możliwe jest
rozbicie listy na wiele linijek w następujący sposób: \`\`` categories: -
pierwsza kategoria - druga kategoria `\`\` W ten sposób możemy definiować
kategorie ze spacją w nazwie.

Formatowanie
------------

Treść ogłoszeń po sekcji metadanych jest interpretowana jako format
[markdown](<http://daringfireball.net/projects/markdown/>), który w dużym
stopniu upraszcza tworzenie i formatowanie tekstu, konwertując pliki tekstowe do
języka HTML zrozumiałego dla przeglądarek. Szybkie wprowadzenie, wraz z
przykładami dostępne jest na stronie
https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet. Istnieje
również możliwość korzystania z edytora online z podglądem na żywo:
http://dillinger.io/
