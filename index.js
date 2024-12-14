const fs = require("fs");
// take command-line arguments passed 
const args = process.argv;
// current working directory
const currentWorkingDirectory = __dirname;

// checking todo.txt file
if (!fs.existsSync(currentWorkingDirectory + "\\todo.txt")) {
    fs.writeFile(currentWorkingDirectory + "\\todo.txt", "", (err) => {
        if (err) console.log(err);
    })
}
// checking done.txt file 
if (!fs.existsSync(currentWorkingDirectory + "\\done.txt")) {
    fs.writeFile(currentWorkingDirectory + "\\done.txt", "", (err) => {
        if (err) console.log(err);
    })
}

// navigate text
const help = () => {
    const UsageText = `
Usage :-
$ node index.js add "todo item"  # Add a new todo
$ node index.js ls               # Show remaining todos
$ node index.js del NUMBER       # Delete a todo
$ node index.js done NUMBER      # Complete a todo
$ node index.js help             # Show usage
$ node index.js report           # Statistics`;

    console.log(UsageText);
}

// addfunction 
const addtodo = () => {
    const todo = args[3];
    if (!todo) {
        console.log("Please enter a todo");
    }
    else {
        fs.appendFile(currentWorkingDirectory + "\\todo.txt", todo + "\n", (err) => {
            if (err) console.log(err);
            console.log("Successfully Added");
        });
    }
}

// Displayfuction 
const displaytodo = () => {
    fs.readFile(currentWorkingDirectory + "\\todo.txt", "utf8", (err, data) => {
        const splitdata = data.split('\n');
        for (let i = 0; i < splitdata.length; i++) {
            console.log(`${i + 1}.${splitdata[i]}`);
        }
    })
}

// Deletefunction 
const deletetodo = () => {
    const todo = args[3];
    const readfiledata = fs.readFileSync(currentWorkingDirectory + "\\todo.txt", "utf8").split('\n')
    // deleteing index through todo
    if (todo - 1 < readfiledata.length && 0 < todo) {
        readfiledata.splice(todo - 1, 1);
        fs.writeFile(currentWorkingDirectory + "\\todo.txt", readfiledata.join("\n"), (err) => {
            if (err) { console.log(err); }
            else {
                console.log("Successfully Deleted");
            }
        })
    }
    else {
        console.log("Todo not found");
    }
    // deleteing todo through todo  
    // for (let i = 0; i < readfiledata.length; i++) {
    //     if (readfiledata[i] == todo) {
    //         readfiledata.splice(i, 1);
    //         fs.writeFile(currentWorkingDirectory + "\\todo.txt", readfiledata.join("\n"),(err)=>{
    //             if(err)
    //                 {console.log(err);}
    //             else{
    //                 console.log("Successfully Deleted"); 
    //             }          
    //         })
    //         break;
    //     }
    //     else {
    //         console.log("Todo not found");
    //     }
    // }
}

// donefunction 
const donefunction = () => {
    const todo = args[3];
    const readfiledata = fs.readFileSync(currentWorkingDirectory + "\\todo.txt", "utf8").split('\n')
    if (todo - 1 < readfiledata.length && 0 < todo) {
        const deletedata = readfiledata.splice(todo - 1, 1);
        // add todo in done
        fs.appendFile(currentWorkingDirectory + "\\done.txt",'\n' +deletedata.join('\n'), (err) => {
            if (err) { console.log(err); }
            else {
                console.log("Successfully Added - done.txt");
            }
        })
        // deleteing in todo
        fs.writeFile(currentWorkingDirectory + "\\todo.txt", readfiledata.join("\n"), (err) => {
            if (err) { console.log(err); }
            else {
                console.log("Successfully Deleted - todo.txt");
            }
        })

    }
    else {
        console.log("Todo not found");
    }
}

// checking the todo stuatus
const Status = () => {
    const tododata = fs.readFileSync(currentWorkingDirectory + "\\todo.txt", "utf8").split("\n").length;
    const donedata = fs.readFileSync(currentWorkingDirectory + "\\done.txt", "utf8").split("\n").length;
    console.log(`Pending Todo:${tododata}, Done Todo:${donedata}`);
}

switch (args[2]) {
    case 'add':
        {
            addtodo();
            break;
        }

    case 'ls':
        {
            displaytodo();
            break;
        }

    case 'del':
        {
            deletetodo();
            break;
        }

    case 'done':
        {
            donefunction();
            break;
        }

    case 'help':
        {
            help();
            break;
        }

    case 'report':
        {
            Status();
            break;
        }

    default:
        {
            help();
        }

    }