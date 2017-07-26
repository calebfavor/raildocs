###### Modal

# Basic Usage

* Modals are instantiated by adding the class .modal to a container and a unique ID
* Modals are triggered by adding the data attribute "data-open-modal" to a clickable element and matching it with the unique ID of the modal you wish to open

<button class="button" data-open-modal="defaultModal">Modal</button>

<div id="defaultModal" class="modal">
<p>This is a Default Modal</h1>
</div>

```html
    <button class="button" data-open-modal="defaultModal">Modal</button>
    
    <div id="defaultModal" class="modal">
        <p>This is a Default Modal</h1>
    </div>
```

# Large or Small Modals

* Modals can have variable sizings by using the .lg and .sm classes

<button class="button" data-open-modal="largeModal">Large</button>
<button class="button" data-open-modal="smallModal">Small</button>

<div id="largeModal" class="modal lg">
<p>This is a Large Modal</h1>
</div>

<div id="smallModal" class="modal sm">
<p>This is a Small Modal</h1>
</div>

```html
    <button class="button" data-open-modal="largeModal">Large</button>
    <button class="button" data-open-modal="smallModal">Small</button>
    
    <div id="largeModal" class="modal lg">
        <p>This is a Large Modal</h1>
    </div>
    
    <div id="smallModal" class="modal sm">
        <p>This is a Small Modal</h1>
    </div>
```

# Animations

* Modals can have entrance animations, like sliding up or sliding down before fading into screen
* Add the .slide-up class to the modal container to get the slide up animation
* Add the .slide-down class to the modal container to get the slide down animation

<button class="button" data-open-modal="slideUpModal">Slide Up</button>
<button class="button" data-open-modal="slideDownModal">Slide Down</button>

<div id="slideUpModal" class="modal slide-up">
<p>This Modal will slide up</h1>
</div>

<div id="slideDownModal" class="modal slide-down">
<p>This Modal will slide down</h1>
</div>

```html
    <button class="button" data-open-modal="slideUpModal">Slide Up</button>
    <button class="button" data-open-modal="slideDownModal">Slide Down</button>
    
    <div id="slideUpModal" class="modal slide-up">
        <p>This Modal will slide up</h1>
    </div>
    
    <div id="slideDownModal" class="modal slide-down">
        <p>This Modal will slide down</h1>
    </div>
```

# Sass Variables

| Variable                           | Usage                                                                    |
|------------------------------------|--------------------------------------------------------------------------|
| **$gutterWidth**                   | Controls amount of padding on the modal                                  |
| **$fixedRowWidth**                 | Controls the size of the large modal                                     |