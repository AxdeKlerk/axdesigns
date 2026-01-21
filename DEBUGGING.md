## 4.1 DEBUGGING LOG — TABLE OF CONTENTS

- [4.1.1 Frontend UI](#411-frontend-ui)
- [4.1.2 Backend / Logic](#412-backend--logic)
- [4.1.3 Database Configuration](#413-database-configuration)
- [4.1.4 System Frameworks](#414-system-frameworks)
- [4.1.5 Basket / Checkout / Payment Logic](#415-basket--checkout--payment-logic)
- [4.1.6 Webhooks & Square Integration](#416-webhooks--square-integration)
- [4.1.7 Security & Deployment](#417-security--deployment)

---

### 4.1.1 Frontend UI

#### 4.1.1.1 *Formspree* always redirected to *Formspree* thank-you page

**Bug:**  
Both the order form and the contact modal redirected to the default *Formspree* thank-you page instead of the local `thank-you.*html*` page. This occurred even when `_next` and `_redirect` hidden inputs were added to the forms.

**Fix:**  
Confirmed that *Formspree* free-tier behaviour ignores *HTML* redirects for standard `POST` submissions. Implemented *JavaScript*-based submission using `fetch()` and manual redirection to regain control of the UX.

**Lesson Learned:**  
Free-tier third-party form services may silently override expected *HTML* behaviour. Client-side interception is required when full control over post-submit navigation is needed.

---

#### 4.1.1.2 *JavaScript* interceptor not firing due to syntax error

**Bug:**  
The form interceptor *JavaScript* failed silently. Console reported:  
`Uncaught TypeError: "" is not a function`

**Fix:**  
Identified that commented-out legacy *JavaScript* left behind invalid syntax, causing the script to crash before the interceptor code executed. Removed the faulty code entirely and isolated experimental logic into a separate junk file.

**Lesson Learned:**  
Any uncaught *JavaScript* error halts execution of all subsequent logic. Always clear legacy or commented code when replacing functionality.

---

#### 4.1.1.3 `await` used outside an async function

**Bug:**  
Console error:  
`Uncaught SyntaxError: await is only valid in async functions`

**Fix:**  
Updated the submit event listener to explicitly declare the handler as `async`.

**Lesson Learned:**  
`await` is only valid inside `async` functions or ES modules. Event listeners must be explicitly marked `async` when using asynchronous logic.

---

#### 4.1.1.4 Duplicate form IDs caused unpredictable behaviour

**Bug:**  
Both the order form and contact modal shared the same `id="order-form"`, causing multiple endpoints to be hooked incorrectly and leading to inconsistent submission behaviour.

**Fix:**  
Ensured all form IDs were unique:
- `id="order-form"` for the order page
- `id="contact-form"` for the contact modal

**Lesson Learned:**  
*HTML* IDs must be globally unique. Duplicate IDs can break *JavaScript* selectors in subtle and misleading ways.

---

#### 4.1.1.5 Contact modal form not intercepted due to missing attribute

**Bug:**  
The contact modal continued redirecting to *Formspree* while the order form worked correctly. Diagnostic logs showed:  
`has data-formspree: false`

**Fix:**  
Confirmed that the live DOM version of the contact form was missing the `data-formspree` attribute. Added the attribute directly to the `<form>` element in the correct *HTML* file.

**Lesson Learned:**  
Never trust editor state alone. Always verify the live DOM using console diagnostics when *JavaScript* selectors fail.

---

#### 4.1.1.6 Modal submit bypassed interceptor due to timing

**Bug:**  
In production, submitting the contact modal on the home page sometimes redirected to *Formspree* before *JavaScript* interception occurred, even though the same logic worked locally.

**Fix:**  
Identified a race condition caused by fast user interaction combined with *Cloudflare Pages* and browser back/forward cache (`bfcache`). Disabled native form submission at the *HTML* level using:
```*html*```
`onsubmit="return false;"`.

**Lesson Learned:**
*JavaScript* interception alone may not be sufficient in production. Critical behaviour should be locked at the *HTML* level to prevent race conditions.

---

#### 4.1.1.7 Final global submit interceptor implementation

**Bug:**
Form interception logic initially relied on querying forms at page load, which failed for dynamically shown modal content.

**Fix:**
Replaced form-level listeners with a document-level submit interceptor:

document.addEventListener('submit', async event => {
    const form = event.target.closest('form');

    if (!form || !form.hasAttribute('data-formspree')) return;

    event.preventDefault();

    try {
        const response = await fetch(form.action, {
            method: form.method || 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            window.location.href = '/thank-you.*html*';
        } else {
            alert('Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('Form submission failed:', error);
        alert('Network error. Please try again.');
    }
});

**Lesson Learned:**
Document-level event delegation is the most robust approach for handling forms inside modals or dynamically rendered UI components.

---

#### 4.1.1.8 Diagnostic *JavaScript* used during debugging

**Bug:**
Form behaviour could not be observed clearly due to immediate navigation away from the page.

**Fix:**
Temporarily added diagnostic logging and disabled redirects to inspect runtime behaviour:

document.addEventListener('submit', async event => {
    console.log('SUBMIT EVENT FIRED');
    console.log('event.target:', event.target);

    const form = event.target.closest('form');

    console.log('closest form:', form);
    console.log('has data-formspree:', form?.hasAttribute('data-formspree'));

    if (!form || !form.hasAttribute('data-formspree')) {
        console.log('Form NOT intercepted');
        return;
    }

    event.preventDefault();
    console.log('Form intercepted:', form);
});

**Lesson Learned:**
Short-lived console logs are often missed during navigation. Using “Preserve log” and temporarily disabling redirects is essential for tracing complex submit flows.



