# PHPStorm

## Find & Replace With Regex Newlines

You can find and replace and put a match from the find string into the replacement. 
This can be done across line breaks as well.

To match in a single line, with 1 wild card being put into the match:

```php
// Example Code
myStringToMatch('cool!')
myStringToMatch($stuff)
myStringToMatch('things', 123123)

// Find Regex: myStringToMatch\((.*?)\)
// Replace Regex: myCoolNewFunction\($1\)

// Output
myCoolNewFunction('cool!')
myCoolNewFunction($stuff)
myCoolNewFunction('things', 123123)

// Note: the ? makes it greedy, meaning it stops at the first instance of the next part of the regex that matches
```

To match multiple lines, with 1 wild card being put into the match:

```php
// Example Code
myStringToMatch(
    [
        'cool!'
    ]
)
myStringToMatch(
    [
        1251234
    ]
)

// Find Regex: myStringToMatch\(([\s\S]*?)\)
// Replace Regex: myCoolNewFunction\($1\)

// Output
myCoolNewFunction(
    [
        'cool!'
    ]
)
myCoolNewFunction(
    [
        1251234
    ]
)
```

Good stuff!