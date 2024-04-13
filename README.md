### Ссылка на GitHub Pages:

[https://akamych.github.io/react-burger/](https://akamych.github.io/react-burger/)

### Вопрос:

Возник вопрос по типизации моковых сторов в джесте:

При конфигурации моковых сторов получаю ошибку в OrderReducer.test.ts:

```
Argument of type 'ThunkMiddleware<any, AnyAction, undefined>[]' is not assignable to parameter of type 'Middleware<{}, any, Dispatch<AnyAction>>[]'.
```

Но, при этом, при такой же типизации в AuthReducer.test.ts такой ошибки нет. В чём может быть дело?
