###### Buttons

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

# Colors

* Adding content classes to the buttons will give them the color relevant to that content type.

<button class="button library">Library</button>
<button class="button course">Course</button>
<button class="button song">Song</button>
<button class="button play-along">Play Along</button>
<button class="button student-focus">Student Focus</button>
<br><br>
<button class="button library inverted">Library</button>
<button class="button course inverted">Course</button>
<button class="button song inverted">Song</button>
<button class="button play-along inverted">Play Along</button>
<button class="button student-focus inverted">Student Focus</button>

```html
   <button class="button library">Library</button>
   <button class="button course">Course</button>
   <button class="button song">Song</button>
   <button class="button play-along">Play Along</button>
   <button class="button student-focus">Student Focus</button>

   <button class="button library inverted">Library</button>
   <button class="button course inverted">Course</button>
   <button class="button song inverted">Song</button>
   <button class="button play-along inverted">Play Along</button>
   <button class="button student-focus inverted">Student Focus</button>
```

# Sass Variables

| Variable                           | Usage                                                                    |
|------------------------------------|--------------------------------------------------------------------------|
| **$primaryThemeColor**             | Controls the default color of a button                                   |
| **$darkGray**                      | Controls default color of a cancel button                                |
| **$libraryGreen**                  | Controls the green for the .library content class                        |
| **$coursesBlue**                   | Controls the blue for the .course content class                          |
| **$songsPink**                     | Controls the pink for the .song content class                            |
| **$playAlongsYellow**              | Controls the yellow for the .play-along content class                    |
| **$studentFocusPurple**            | Controls the purple for the .student-focus content class                 |