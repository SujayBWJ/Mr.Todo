# Postmortem — Mr. Todo

This project looked simple. It wasn’t.

Most failures were not about syntax. They were about *mental models*.

---

## 1. DOM Timing Misunderstanding

**Symptom:**  
`addEventListener` throwing errors on `null`.

**Cause:**  
JS executed before the DOM existed. I assumed elements were available just because they were in HTML.

**Fix:**  
- Used `defer` or moved the script to the bottom.
- Learned that *DOM creation and JS execution are separate phases*.

**Lesson:**  
The browser is asynchronous. Order matters.

---

## 2. Confusing Read vs Write APIs

**Symptom:**  
Todos never saved.

```js
localStorage.getItem("todos", JSON.stringify(todos));
```
<b>Cause:</b>
Used getItem instead of setItem.

<b>Fix:</b>
```js
localStorage.setItem("todos", JSON.stringify(todos));
```

<b>Lesson:</b>
APIs encode intent. “Get” and “Set” are not symmetric.

## 3. Invalid Element Creation

<b> Symptom: </b>
List rendering behaved inconsistently.
``` js
document.createElement("list");
```

<b>Cause:</b>
Assumed any tag name works.

<b>Fix:</b>
```js
document.createElement("li");
```

<b>Lesson:</b>
The DOM is not abstract. It enforces HTML semantics.

## 4. CSS Selector Misuse

<b>Symptom:</b>
Dark mode text color never changed.
```js
body.dark.welcome { ... }
```

<b>Cause:</b>
Misunderstood descendant selectors.

<b>Fix:</b>

body.dark .welcome { ... }


<b>Lesson:</b>
CSS is a tree query language. One missing space changes meaning entirely.

## 5. One-Way Transitions

<b>Symptom:</b>
Dark → Light snapped instantly.

<b>Cause:</b>
Transition placed only on .dark.

<b>Fix:</b>
Moved transition to base body.

<b>Lesson:</b>
Transitions must live on the stable state, not the variant.

## 6. Stateless UI

<b>Symptom:</b>
Theme reset on refresh.

<b>Cause:</b>
Treated UI state as ephemeral.

<b>Fix:</b>
Persisted theme in localStorage and restored on load.

<b>Lesson:</b>
If state matters, it must be externalized.

### Root Pattern

<b> Every mistake came from assuming: </b>
<ul>
<li>The browser is synchronous</li>

<li>The DOM is abstract</li>

<li>CSS is declarative “magic”</li>

<li>State survives implicitly</li>
</ul>

None of those are true.

The project failed until I started thinking in systems:
<ul>
<li>DOM lifecycle</li>

<li>Data as source of truth</li>

<li>UI as projection</li>

<li>State as explicit memory</li>
</ul>

This was not a todo app.
It was an introduction to how real software behaves.
