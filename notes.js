// Start of the file
const fs = require('fs')
const chalk = require('chalk')

// List notes function
const listNotes = function() {
    notes = loadNotes()
    if (notes.length === 0){
        console.log('No new note created')
    }else{
        console.log(chalk.inverse.bold("Your notes..."))
        console.log()
        notes.forEach(function(x){
            console.log(chalk.blue('\tTitle:'),chalk.green(x.title))
            // console.log(chalk.blue('Body:'), chalk.green(x.body))
            // console.log()
        })
    }
}

// Read note function
const readNote = function(title){
    flag = 0
    notes = loadNotes()
    notes.forEach((note) => {
        if (note.title == title){
            console.log(chalk.blue('\tTitle:'),chalk.green(note.title))
            console.log(chalk.blue('\tBody:'), chalk.green(note.body))
            console.log()
            flag = 1
        }
    })
    if (flag == 0){
        console.log(chalk.bgBlack.red.bold.inverse('Note not found!!'))
    }
}

// Add note function
const addNote = function(title,body){
    const notes = loadNotes();
    // console.log(typeof notes)
    const dupNotes = notes.filter((note) => note.title === title)
    if (dupNotes.length == 0){
        notes.push({
            title: title,
            body: body
        })
    } else{
        console.log('Duplicate notes found!!');
        process.exit(0)
    }
    saveNotes(notes)
    console.log('Note saved successfully!!')
    // console.log(saveNotes())

}

const removeNote = function (title){
    const notes = loadNotes();
    catcher = [];
    flag = 0;
    if (notes == []){
        console.log('No notes are present in the file');
    }
    else{
        for(let i = 0; i < notes.length; i++){
            if (notes[i].title == title){
                console.log(chalk.green('Removing the note:', title))
                console.log(chalk.bgGreen('Note removed successfully!!'))
                flag = 1;
            }
            else if (i == (notes.length - 1) && title != notes[i].title && flag == 0){
                console.log(chalk.bgRed('Note not found in the body to remove'))
                note = {
                    title: notes[i].title,
                    body: notes[i].body
                }
                catcher.push(note)
            }
            else{
                note = {
                    title: notes[i].title,
                    body: notes[i].body
                }
                catcher.push(note)
            }
        }

        saveNotes(catcher)
        // if (title == i){ }// if title matches with something
        // console.log('removing the note')
    }
    
}






const loadNotes = function() {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        data = dataBuffer.toString();
        return JSON.parse(data)
        // console.log(JSON.parse(data));
    } catch(e){
        return []
    }
}

const saveNotes = function (notes) {
    data = JSON.stringify(notes);
    fs.writeFileSync('notes.json', data)
}

// addNote('t','b')
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}