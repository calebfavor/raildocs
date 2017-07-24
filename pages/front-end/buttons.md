# Basic Usage

* Buttons use the button tag, with the .button class added to it.
* Do not use an anchor tag with the button class, instead wrap the anchor around the button tag if you want to make it a link rather than a form submission or UI element.

<button class="button">Button</button>

```html
    <button class="button">Button</button>
```

# Size and Purpose

 * If you want a smaller button, use the .shortened class
 * If you want a cancel button, use the .cancel class
 * If you want an inverted button, use the inverted class
 * If you want a full width button, use the .extended class

<button class="button cancel">Cancel</button>
<button class="button shortened">Short</button>
<button class="button inverted">Inverted</button>
<br><br>
<button class="button extended">Extended</button>

```html
   <button class="button cancel">Cancel</button>
   <button class="button shortened">Short</button>
   <button class="button inverted">Inverted</button>
   <button class="button extended">Extended</button>
```

# Animated Effects

* Adding in the .animated class will cause a small raindrop effect to appear where the button was clicked

<button class="button animated">Animated</button>

```html
   <button class="button animated">Animated</button>
```