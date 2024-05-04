// Function to return conditions from args
export const checkArgs = function(args: string[]) {
    let conditions: {[key: string]: string} = {}
    args.map((arg => {
        process.argv.map(( inputArg => {
            if (inputArg.includes("=")) {
                if (inputArg.split("=")[0].includes(`--${arg}`)) {
                    conditions[arg] = inputArg.split("=")[1];
                }
            }
        }))
    }))
    return conditions
}
