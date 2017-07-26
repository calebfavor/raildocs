###### Navigation

# Basic Usage

* Create a header (or div) with the class .top-bar

```html
    <header class="top-bar">
    ...
    </header>
```

* To add your logo in the top left. Nest a div with the class .logo

# Adding a Logo

```html
    <header class="top-bar">
        <div class="logo">
            <img src="your-logo.png">
        </div>
    </header>
```

# Hamburger Nav

* To add a hamburger menu. Nest a div with the class .hamburger and put the hamburger nav icon inside of it
* Create a nav (or div) tag outside of the top bar and give it the class .hamburger-nav


```html
    <header class="top-bar">
        <div class="logo">
            <img src="your-logo.png">
        </div>
        
        <div class="hamburger">
            <i class="fa fa-bars"></i>
        </div>
    </header>
    
    <nav class="hamburger-nav">
    
    </nav>
```

