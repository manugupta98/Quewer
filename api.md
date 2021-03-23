# Users

## UserINFO

```url
 GET: '/users'
 ```

Sample response

```json
{
    "data": {
        "type": "users",
        "id": "6033cdd4eedafa51f7dee8cb",
        "attributes": {
            "displayName": "MANU GUPTA",
            "name": {
                "familyName": ".",
                "givenName": "MANU GUPTA"
            },
            "photos": [
                {
                    "_id": "6033cdd4eedafa51f7dee8cc",
                    "value": "https://lh3.googleusercontent.com/a-/AOh14GhNlYfOARRXQGUx-ofMuyWeXxMUfhzeCKO10ySx=s96-c"
                }
            ]
        },
        "relationships": {
            "registeredCourses": {
                "data": [
                    {
                        "type": "courses",
                        "id": "60324bace79d560e3c01db89"
                    },
                ]
            }
        }
    }
}
```


# Questions

## Retrive all questions of a course

```url
 GET: '/courses/:courseID/questions'
 ```

Sample response

```json
{
    "data": [
        {
            "type": "questions",
            "id": "60595c1fe89e087648d52e61",
            "attributes": {
                "title": "It's a question?",
                "description": "It's just a question nothing more then that.",
                "date": "2021-03-18T16:00:00.000Z",
                "upvotes": 0,
                "attachments": [],
                "tags": [],
                "answers": []
            },
            "relationships": {
                "course": {
                    "data": {
                        "type": "courses",
                        "id": "60324bace79d560e3c01db89"
                    }
                },
                "postedBy": {
                    "data": {
                        "type": "postedBies",
                        "id": "6033cdd4eedafa51f7dee8cb"
                    }
                }
            }
        },
        {
            "type": "questions",
            "id": "605971798ca1d921cb3c600f",
            "attributes": {
                "title": "It's a question?",
                "description": "It's just a question nothing more then that.",
                "date": "2021-03-18T16:00:00.000Z",
                "upvotes": 0,
                "attachments": [],
                "tags": [],
                "answers": []
            },
            "relationships": {
                "course": {
                    "data": {
                        "type": "courses",
                        "id": "60324bace79d560e3c01db89"
                    }
                },
                "postedBy": {
                    "data": {
                        "type": "postedBies",
                        "id": "6033cdd4eedafa51f7dee8cb"
                    }
                }
            }
        },
        {
            "type": "questions",
            "id": "605971b4b26d0d230d9ea35b",
            "attributes": {
                "title": "It's a question?",
                "description": "It's just a question nothing more then that.",
                "date": "2021-03-18T16:00:00.000Z",
                "upvotes": 0,
                "attachments": [],
                "tags": [],
                "answers": []
            },
            "relationships": {
                "course": {
                    "data": {
                        "type": "courses",
                        "id": "60324bace79d560e3c01db89"
                    }
                },
                "postedBy": {
                    "data": {
                        "type": "postedBies",
                        "id": "6033cdd4eedafa51f7dee8cb"
                    }
                }
            }
        }
    ]
}
```

## Retrive a question by ID

```url
 GET: '/courses/:courseID/questions/:questionID'
 ```

 Sample response

```json
{
    "data": [
        {
            "type": "questions",
            "id": "60595c1fe89e087648d52e61",
            "attributes": {
                "title": "It's a question?",
                "description": "It's just a question nothing more then that.",
                "date": "2021-03-18T16:00:00.000Z",
                "upvotes": 0,
                "attachments": [],
                "tags": [],
                "answers": []
            },
            "relationships": {
                "course": {
                    "data": {
                        "type": "courses",
                        "id": "60324bace79d560e3c01db89"
                    }
                },
                "postedBy": {
                    "data": {
                        "type": "postedBies",
                        "id": "6033cdd4eedafa51f7dee8cb"
                    }
                }
            }
        }
    ]
}
```

## Retrive a question by ID

```url
 POST: '/courses/:courseID/questions'
 ```

 Sample request

```json
{
    "data": {
        "type": "questions",
        "attributes": {
            "title": "It's a question?",
            "description": "It's just a question nothing more then that.",
            "date": "2021-03-18T16:00:00.000Z",
            "upvotes": 0
        },
        "relationships": {
            "course": {
                "data": {
                    "type": "courses",
                    "id": "60324bace79d560e3c01db89"
                }
            },
            "postedBy": {
                "data": {
                    "type": "postedBies",
                    "id": "6033cdd4eedafa51f7dee8cb"
                }
            }
        }
    }
}
```

 Sample response

```json
{
    "data": {
        "type": "questions",
        "id": "605971b4b26d0d230d9ea35b",
        "attributes": {
            "title": "It's a question?",
            "description": "It's just a question nothing more then that.",
            "date": "2021-03-18T16:00:00.000Z",
            "upvotes": 0,
            "attachments": [],
            "tags": [],
            "answers": []
        },
        "relationships": {
            "course": {
                "data": {
                    "type": "courses",
                    "id": "60324bace79d560e3c01db89"
                }
            },
            "postedBy": {
                "data": {
                    "type": "postedBies",
                    "id": "6033cdd4eedafa51f7dee8cb"
                }
            }
        }
    }
}
```