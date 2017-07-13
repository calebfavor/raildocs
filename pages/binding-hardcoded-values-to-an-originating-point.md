<!-- binding-hardcoded-values-to-an-originating-point.md -->

# Binding hardcoded values to an originating point

For example, for the LibraryLessonWordpressGroup, the LibraryLesson entity class (namespace: _____) has this:

```php
public static $difficulties = [
    'all' => 'all',
    'beginner' => 'beginner',
    'intermediate' => 'intermediate',
    'advanced' => 'advanced'
];
```

In LibraryLesson

You can see the $difficulty string value "**enforced**" to use one of the values in the static array. Keep this kind of binding — of hard-coded values to a source — in mind. If a term needs to be changed later, this will make it much easier.


Basically: 

`$difficulty === LibraryLesson::$difficulties['all']`

... in this: (the `\Entities\Lessons\Library\` is just the namespace.)

```html
@foreach(\Entities\Lessons\Library\LibraryLesson::$difficulties as $difficulty)
    <div id="{{ lcfirst(str_replace(' ', '', $difficulty)) }}" class="row expanded scrolling-cards-row catalogue {{
        !empty($lessonsHtml[$difficulty]) ? '' : 'hide'
    }}">
        @if($difficulty === \Entities\Lessons\Library\LibraryLesson::$difficulties['all'])
            <h3>{{ ucwords($difficulty) }} Levels</h3>
        @else
            <h3>{{ ucwords($difficulty) }}</h3>
        @endif
```

# For example:

This:

```
```html
<input id="lesson-group-ajax-info" type="hidden"
   data-ajax-url="{{ URL::route('members-area.json.lesson-group.request', ['courses']) }}"
>
```

Can become this:

```html
data-ajax-url="{{ URL::route(
    'members-area.json.lesson-group.request', 
    [\Lessons\LessonGroupFactory::LESSON_TYPE_COURSES]
) }}">
```

In PHPStorm, if you hold the "ctrl" key (windows) and mouse over the `LESSON_TYPE_COURSES` section of the above code, it will show the value that represents. Which currently is the string `'courses'`. If somebody later needs to change that string, they then need only change it in that constant in the LessonGroupFactory class file. They won't then need to search the code bases for all instances of 'courses' because the value is *no longer hardcoded **without binding** to it originating point*.