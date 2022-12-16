### Things I could have done better
1.  ESLINt -> Linting the files with a proper set of rules could've included code quality, formatting, and consistency
2.  Too much casting, lessens the point of typescript.
3.  Why Vite / Vitest instead of traditional CRA / Jest
    1.  Vite is more modern, and the fast and responsive HMR was beneficial while scoping out this prototype
    2.  I used Vitest + React Testing Library as I felt like it was the best trade off for DOM interaction tests / business logic
4.  I used a UUID library to simulate unique ID's coming from a database, could've just spun up my own MongoDB / Postgres instance
5.  The useEffect cleanup was un-necessary, as there were no true incidents of having to 'cleanup'
6.  Incorrectly layed my spec files, Describe -> It -> Test
7. Add unit tests for test-helpers i.e mockPromiseHelper

