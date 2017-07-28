###### Responsive Ratios

* Responsive Ratios are instantiated by adding the .responsive-ratio class to a .col

# 16:9

* Add the .video class to lock the container into a 16:9 ratio

<div class="row">
<div class="col responsive-ratio video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/du-TY1GUFGk" frameborder="0" allowfullscreen></iframe>
</div>
</div>

```html
    <div class="row">
        <div class="col responsive-ratio video">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/du-TY1GUFGk" frameborder="0" allowfullscreen></iframe>
        </div>
    </div>
```

# 1:1

* Add the .square class to lock the container into a 1:1 ratio


<div class="row">
<div class="col sm-6 md-4 collapse">
<div class="col responsive-ratio square">
<img src="https://placehold.it/500x500">
</div>
</div>
</div>

```html
    <div class="col responsive-ratio square">
        <img src="https://placehold.it/500x500">
    </div>
```