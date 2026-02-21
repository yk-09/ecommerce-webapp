# 🛒 The Desire Store
**A Full-Scale E-Commerce Storefront**

Welcome to **The Desire Store**. This project is a deep dive into building a functional, responsive shopping experience using an "Engineering First" approach to frontend development.

🚀 [**Live Demo**](https://yk-09.github.io/ecommerce-webapp/index.html)

---

## 🏗️ Project Architecture
The development of this storefront followed a structured 3-step engineering logic to ensure scalability and clean code:

1.  **Data Management:** Product information is centralized in JavaScript objects to simulate a database environment, making the catalog easy to maintain.
2.  **Dynamic Generation:** Developed a rendering engine using JS loops to automatically generate HTML components, ensuring the UI stays in sync with the data.
3.  **Interactive Logic:** Implemented event listeners to handle "Add to Cart" functionality and persistent data storage via `localStorage`.

---

## ✨ Key Features
* **Dynamic Product Grid:** Products are injected into the DOM via JavaScript.
* **Persistent Shopping Cart:** Items remain in the cart even after a page refresh.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.
* **Engineering-First Code:** Modular functions and clean separation of concerns.

---

## 🛠️ Tech Stack
* **HTML5** - Semantic structure.
* **CSS3** - Custom styling and Flexbox/Grid layouts.
* **JavaScript (ES6+)** - DOM manipulation and state management.

---

## 📸 Preview
![homepage preview](readme-images-gif/homepage%20preview%20readme.JPG)
![homepage preview](readme-images-gif/homepage%20preview%20readme%20(2).JPG)

---

## 🏠 Homepage Engineering

Below are the details of how the homepage was built. Click each section to see the "Under the Hood" logic.

<details>
<summary><b>📐 HTML: The Skeleton</b></summary>

### The Core Elements
I structured the page into three main segments to ensure a semantic and accessible layout:

* **The Navbar:** Built using a `<nav>` container. It houses the Brand, the *"Apni kaamna khojie"* search bar, and the Cart icon.

```html
  <!-- skeleton of nav bar -->
  <div>
    <img src="brand-icon.jpg" alt="">
    <input type="search" placeholder="search">
    <button>
    </button>
  </div>

```
* **The Hero Section:** A simple `<h2>` designed to grab user attention immediately upon landing.
```html
<!-- hero text -->
  <p>
    Jaha Paisa khatam hota hai...
    Par Kaamna nahi.
  </p>
```
* **The Product Grid:** A parent `div` that acts as a container for all dynamically generated products.
```html
<!-- products container -->
  <div>
    <!-- products -->
    <div>
      <!-- product's image -->
      <img src="https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9vZGllfGVufDB8fDB8fHww" alt="product image">

      <!-- product name -->
      <p>
        hoodie
      </p>

      <!-- ratings -->
      <div>
        <img src="" alt="">
        <span>253</span>
      </div>

      <!-- product price -->
      <p></p>

      <!-- product quantity input  -->
       <select name="" id="">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
       </select>

       <!-- add to cart button  -->
        <button>
          add to cart
        </button>
    </div>
  </div>
```
</details>

<details>
<summary><b>🎨 CSS: The Styling (Bootstrap + Custom)</b></summary>

### Making it "Pretty"
I leveraged **Bootstrap 5** for a responsive layout grid but layered on custom CSS to achieve a unique, professional aesthetic.

* **Priority Rule:** I utilized **External CSS** for maintainability, while remaining mindful of the CSS specificity hierarchy (where Inline Styles hold the highest priority).
* **The Image Box Trick:** To solve the common issue of inconsistent card heights, I wrapped product images in an `.image-box` with `display: flex` and fixed heights to ensure a perfectly aligned grid.
* **3D Effects:** Implemented `box-shadow` on the navbar and product cards to add depth and a modern "elevated" feel.
* **Search Bar Logic:** Applied `flex-grow: 1` to the search input, allowing it to intelligently fill available space within the navbar.

</details>

<details>
<summary><b>⚙️ JS: The Interaction Engine</b></summary>

### Dynamic HTML Generation
Instead of hard-coding every item, I centralized all product data in `products.js` and used JavaScript to build the interface programmatically.

#### The Engineering Logic:
1.  **Iterative Loop:** Systematically traverse the products array.
2.  **Template Literals:** Used ES6 template strings to create a reusable HTML blueprint for each product card.
3.  **DOM Injection:** Utilized `.innerHTML` to render the generated code into the main container efficiently.

#### Key Snippet:
```javascript
import { products } from '../data/products.js';

let productsHTML = '';

products.forEach(product => {

  productsHTML += 
    `
    <div class="col">
      <div class="card">
        <div class="image-box">
          <img src="${product.image}" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
          <p class="card-title">${product.name}</p>
          <p class="card-text">
            R${(product.pricePaisa / 100).toFixed(2)}
          </p>
          <div class="product-ratings">
            <!-- <img src="" alt=""> -->
            <div>
              ★★★★★
            </div>
            <div class="reviews">
              (${product.rating.count})
            </div>
          </div>
          <select name="" id="">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <button class="btn add-to-cart-button">
            Add to Hart
          </button>
        </div>
      </div>
    </div>
    `
});

console.log(productsHTML);

document.querySelector('.js-products-row')
  .innerHTML = productsHTML;
```
</details>

## 🎥 Visual Demos

### Homepage Preview
![homepage preview](readme-images-gif/homepage%20preview%20readme.JPG)
![homepage preview](readme-images-gif/homepage%20preview%20readme%20(2).JPG)

### 🛒 Interaction: Add to Cart

> **Note:** Here is a look at the **"Add to Hart"** (Add to Cart) flow. It features an instant UI feedback loop—updating the cart count and triggering a confirmation toast without refreshing the page.

![Add to Cart Demo](path/to/your/demo-animation.gif)

#### Key Features:
* **Zero-Refresh Updates:** Cart state updates instantly via JavaScript.
* **Visual Cues:** The cart icon badge increments dynamically.
* **Toast Notifications:** A "Success" message appears to confirm the item was added.

---

### 🛠️ Technical Implementation
Currently, this is handled via **Vanilla JavaScript** using:
1.  **Event Delegation:** Listening for clicks on all `.js-add-to-hart-button` buttons.
2.  **Local Storage:** Persisting the cart data so items remain if the user refreshes.
3.  **Dynamic UI Updates:** Upon clicking the button, a script automatically increments the `span` count within the navbar cart icon, providing instant visual confirmation.

> [!TIP]
> This logic is prepared for the upcoming **React Migration**, where this global state will be moved into a `useCart` hook for cleaner data flow.

---

## 🛠️ Setup & Installation

To get a local copy up and running, follow these simple steps:

1. **Clone the repository:**

    🚀 [**git clone**](https://github.com/yk-09/ecommerce-webapp)

2. **Open the folder:** 
  Launch the project in VS Code.

3. **Install Extensions:** 
   Ensure you have the Live Server extension installed.

4. **Launch:** 
   Right-click index.html and select "Open with Live Server" to view the app in your browser.

## 🚀 Roadmap

Keep track of the project's progress and upcoming features.

- [x] **Homepage Development**
  - HTML/CSS/JS (Complete)
- [ ] **Checkout Page**
  - Form validation and order summary. persistence
- [ ] **Order Tracking System**
  - Real-time status simulation.
- [ ] **React Migration**
  - Converting components into reusable React pieces.

---