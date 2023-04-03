const fails = async () => {
  console.log(
    "this returns a rejected promise, and your process will crash just a tick later if you don't handle it."
  );
  return Promise.reject("you should have listened to me.");
};

const example = async () => {
  console.log("do not call async function without awaiting on it!");
  try {
    fails(); // CRASH: try adding an `await` here
    console.log("** you will regret this. **");
  } catch (err) {
    console.log("CAUGHT: " + err);
    // CRASH: try different ways of handling/rethrowing the error here
    //throw e;
    throw new Error("example also fails: " + err);
    //return Promise.resolve("error handled" + err);
  }
  return Promise.resolve("ok");
};

const main = async () => {
  console.log("starting");

  let x = await example();
  console.log("result = " + x);
  console.log("done");
};

main();
