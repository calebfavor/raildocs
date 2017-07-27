###### Accordion

# Basic Usage

* Accordions are comprised of two elements; The header and the content
* To instantiate an accordion create a .col with the class .accordion, nest inside of it two containers, one with the class .accordion-header, the other with the class .accordion-content

<div class="row fluid collapse">
<div class="col accordion">
<div class="accordion-header">
<p>Click to Drop Down</p>
</div>
<div class="accordion-content">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</div>
</div>
</div>
<br>
<br>

```html
    <div class="col accordion">
        <div class="accordion-header">
            <p>Click to Drop Down</h2>
        </div>
        <div class="accordion-content">
           ...
        </div>
    </div>
```

# Always Open

* To keep the accordion open by default, add the .active class to the .accordion element

<div class="row fluid collapse">
<div class="col accordion active">
<div class="accordion-header">
<p>Click to Drop Down</p>
</div>
<div class="accordion-content">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</div>
</div>
</div>
<br>
<br>

```html
    <div class="col accordion">
        <div class="accordion-header">
            <p>Click to Drop Down</h2>
        </div>
        <div class="accordion-content active">
            ...
        </div>
    </div>
```