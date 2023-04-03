# node-remember-promises
A little exercise with UnhandledPromiseRejection demo

## Running

```
nvm use
yarn install
yarn run start
```

## Discussion

It turns out it is very easy to mess up an async method call, and cause your Node process to shut down. But is something you _want_, because you want to catch these bugs early and you want them handled. (And what better way to make it happen than a loud crash.)

In the example, you execute it with `yarn run start` and following output is printed:

```
starting
do not call async function without awaiting on it!
this returns a rejected promise, and your process will crash just a tick later if you don't handle it.
** you will regret this. **
result = ok
[UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "you should have listened to me.".] {
  code: 'ERR_UNHANDLED_REJECTION'
}
```

The program thinks everything was nice, maybe you think we got away with it, but then boom, crash.
The `** you will regret this. **` line foreshadows this.


If await is added, there are a few way to handle the error. 

But, if you await on the fails() call, and rethrow, it seems just rethrowing the err will also cause Node to exit. Does it somehow raise a "must kill the process" flag within Node runtime?

I mean, now example() does everything right. main() does everything right (exception it does not have try/catch). Still the example exits with
```
[UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "you should have listened to me.".] {
  code: 'ERR_UNHANDLED_REJECTION'
}
```
Not sure why. It's different with `throw new Error` case.
