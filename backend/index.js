import { config } from 'dotenv';
config();
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore/lite';

// TODO: Replace the following with your appFirebase's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};



const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

// Get a list of students from your database
async function getstudents(db) {
  const studentsCol = collection(db, 'students');
  const studentsSnapshot = await getDocs(studentsCol);
  const studentsList = studentsSnapshot.docs.map(doc => doc.data());
  return studentsList;
}


//console.log(getstudents(db));
console.log(await getstudents (db));


//const express = require('express')  // COMMON JS
import express from 'express';   //ENMA JS
//var cors = require('cors'); //COMMON JS
import cors from 'cors'; //ENMA JS
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.get('/', (req, res) => {
  res.send('EPN FIS!')
})

// read all student
app.get("/api/read", (req, res) => {
  console.log(req.params.item_id); // Agrega este log para verificar el ID recibido
  (async () => {
    try {
      let response = [];
      const querySnapshot = await getDocs(collection(db, "students"));
      //let docs = querySnapshot.docs;
      //for (let doc of docs) {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        const selectedItem = {
          id: doc.id,
          student: doc.data(),
        };
        response.push(selectedItem);
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);  // Error grave, error interno en el servidor 
    }
  })();
});

// read one student
app.get("/api/read/:item_id", (req, res) => {
  console.log(req.params.item_id);
  (async () => {
    try {
      let response = [];
      const q = query(
        collection(db, "students"),
        where("ID", "==", parseInt(req.params.item_id))
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const selectedItem = {
          id: doc.id,
          student: doc.data(),
        };
        response.push(selectedItem);
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// create student
app.post("/api/create", (req, res) => {
  (async () => {
    try {
      console.log(req.body.student);
      /*
            const docRef = await addDoc(collection(db, "students"), {
                ID: 2,
                name: "Jane Smith",
                age: 17,
                grade:"B"
              });
              */
      const docRef = await addDoc(collection(db, "students"), req.body.student);
      return res.status(200).send({ message: "Student created successfully", id: docRef.id });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Failed to create student" });
    }
  })();
});

app.put("/api/update/:item_id", (req, res) => {
  (async () => {
    try {
      const studentId = req.params.item_id; // Obtener el ID del estudiante desde la solicitud
      await updateStudentById(studentId, req.body.student); // Llamar a una nueva función para actualizar el estudiante por su ID
      return res.status(200).send({ message: "Student updated successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Failed to update student" });
    }
  })();
});

// Nueva función para actualizar el estudiante por su ID
async function updateStudentById(studentId, updatedStudent) {
  try {
    // Verificar que el estudiante con el ID proporcionado exista en la base de datos
    const q = query(collection(db, "students"), where("ID", "==", parseInt(studentId)));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error("Estudiante no encontrado");
    }

    // Obtener el documento del estudiante y actualizarlo con los nuevos datos
    const studentDocument = querySnapshot.docs[0];
    const studentDocumentId = doc(db, "students", studentDocument.id);
    await updateDoc(studentDocumentId, updatedStudent);
  } catch (error) {
    throw error;
  }
}


// delete
app.delete("/api/delete/:item_id", (req, res) => {
  (async () => {
    try {
      //const studentDocumentId = doc(db, "students", req.params.item_id);
      //console.log(req.params.item_id, studentDocumentId);
      await deleteDoc(doc(db, "students", req.params.item_id));
      return res.status(200).send({ message: "Student deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Failed to delete student" });
    }
  })();
});

app.listen(port, () => {
  console.log(`webApi listening on port ${port}`)
})

