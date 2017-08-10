###### Validation Rules

# Rules

| Rule                        | Data Attribute                                                          |
|-----------------------------|-------------------------------------------------------------------------|
| Required                    | data-validate-required="true"                                           |
| Email                       | data-validate-email="true"                                              |
| Password                    | data-validate-password="{{ id of field to match }}"                     |
| Min Length                  | data-validate-min-length="{{ integer }}"                                |
| Max Length                  | data-validate-max-length="{{ integer }}"                                |
| URL                         | data-validate-url="true"                                                |
| Number                      | data-validate-number="true"                                             |
| Credit Card                 | data-validate-credit-card="true"                                        |

# Validation Messages

| Rule                        | Message                                                                 |
|-----------------------------|-------------------------------------------------------------------------|
| Default Message             | This value seems to be invalid.                                         |
| Required                    | This value is required.                                                 |
| Email                       | Please enter a valid email address.                                     |
| Password                    | The password fields must match.                                         |
| Min Length                  | This value is too short.                                                |
| Max Length                  | This value is too long.                                                 |
| URL                         | Please enter a valid URL.                                               |
| Number                      | This value must be a number.                                            |
| Credit Card                 | This value must be a valid credit card number.                          |



* To change these validation messages. Use the **editValidationMessages** method described in the methods section