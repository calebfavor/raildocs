###### Loading Animations

# Basic Usage

* Loading animations **absolutely** position themselves in the center of the nearest **relatively** positioned parent
* In the sample below the column is given a height of 100px and relatively postioned, so the loading animation positions itself within the center of it.

<div class="row fluid collapse">
<div class="col lg-4 md-6 sm-12" style="position:relative;height:100px;border:1px solid #d1d1d1;">
<div class="loading-animation">
<div class="animation">
<div class="rect1"></div>
<div class="rect2"></div>
<div class="rect3"></div>
<div class="rect4"></div>
<div class="rect5"></div>
</div>
</div>
</div>
</div>


```html
    <div class="col lg-4 md-6 sm-12" style="position:relative;height:100px;border:1px solid #d1d1d1;">
        <div class="loading-animation">
            <div class="animation">
                <div class="rect1"></div>
                <div class="rect2"></div>
                <div class="rect3"></div>
                <div class="rect4"></div>
                <div class="rect5"></div>
            </div>
        </div>
    </div>
```

# Colors

* The loading animation can be given a content class to the .animation container to match the color of a certain piece of content

<div class="row fluid collapse">

<div class="col lg-4 md-6 sm-12" style="position:relative;height:100px;border:1px solid #d1d1d1;">
<div class="loading-animation">
<div class="animation library">
<div class="rect1"></div>
<div class="rect2"></div>
<div class="rect3"></div>
<div class="rect4"></div>
<div class="rect5"></div>
</div>
</div>
</div>

<div class="col lg-4 md-6 sm-12" style="position:relative;height:100px;border:1px solid #d1d1d1;">
<div class="loading-animation">
<div class="animation course">
<div class="rect1"></div>
<div class="rect2"></div>
<div class="rect3"></div>
<div class="rect4"></div>
<div class="rect5"></div>
</div>
</div>
</div>

<div class="col lg-4 md-6 sm-12" style="position:relative;height:100px;border:1px solid #d1d1d1;">
<div class="loading-animation">
<div class="animation song">
<div class="rect1"></div>
<div class="rect2"></div>
<div class="rect3"></div>
<div class="rect4"></div>
<div class="rect5"></div>
</div>
</div>
</div>

<div class="col lg-4 md-6 sm-12" style="position:relative;height:100px;border:1px solid #d1d1d1;">
<div class="loading-animation">
<div class="animation play-along">
<div class="rect1"></div>
<div class="rect2"></div>
<div class="rect3"></div>
<div class="rect4"></div>
<div class="rect5"></div>
</div>
</div>
</div>

<div class="col lg-4 md-6 sm-12" style="position:relative;height:100px;border:1px solid #d1d1d1;">
<div class="loading-animation">
<div class="animation student-focus">
<div class="rect1"></div>
<div class="rect2"></div>
<div class="rect3"></div>
<div class="rect4"></div>
<div class="rect5"></div>
</div>
</div>
</div>

</div>

```html
    <div class="col lg-4 md-6 sm-12" style="position:relative;height:100px;border:1px solid #d1d1d1;">
        <div class="loading-animation">
            <div class="animation library">
                <div class="rect1"></div>
                <div class="rect2"></div>
                <div class="rect3"></div>
                <div class="rect4"></div>
                <div class="rect5"></div>
            </div>
        </div>
    </div>
```

