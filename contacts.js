import { readFile } from 'node:fs'
import * as fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'


const contactsPath = path.resolve('db', 'contacts.json')

async function listContacts() {
   const data = await fs.readFile(contactsPath, 'utf-8')

    console.log(JSON.parse(data))
  }

  async function writeContact (contact){
    await fs.writeFile(contactsPath, JSON.stringify(contact , undefined, 2))
  }

  async function getContactById(contactId) {
    const contacts = await listContacts()

    const contact = contacts.find(k => k.id === contactId)
    if(typeof contact === 'undefined'){
        return null
    }

    console.log(contact)
  }

  async function removeContact(contactId) {
    const contact = await listContacts()

    const index = contact.findIndex((contact) => contact.id === contactId)

    if(index === -1){
        return null
    }
    const removeCont = contact[index]
    
    contact.splice(index, 1)

    await writeContact(contact)
    console.log(removeCont)
  }
  
  async function addContact(name, email, phone) {
    const contact = await listContacts()

    const newContact = { id: crypto.randomUUID(), name , email, phone}

    contact.push(newContact)

    await writeContact(contact)

    console.log(newContact)
  }


export default {
    listContacts,
    getContactById,
    removeContact,
    addContact
}