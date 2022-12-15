# Part0

## Exercise 0.4

```mermaid
sequenceDiagram
    Note over browser:onclik submit
    browser->>server:HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    server->>browser:response status302 redirect
    Note over browser:redirect
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    server->>browser: HTML-code
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server->>browser: main.css
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server->>browser: main.js
    Note over browser:render

```

## Exercise 0.5,0.6


```mermaid
sequenceDiagram
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
    server->>browser: HTML-code
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server->>browser: main.css
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server->>browser: spa.js
    browser->>server:https://studies.cs.helsinki.fi/exampleapp/data.json
    server->>browser:data.json
    Note over browser:submit
    browser->>server:HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note over server:cache data
    Note over browser:render

```