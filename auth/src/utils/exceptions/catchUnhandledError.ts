export const UncaughtException = () => {
    process.on("uncaughtException", (err) => {

        console.log("UNCAUGHT EXCEPTION");
        console.log(err.name, err.message);
        process.exit(1);
    });
}
