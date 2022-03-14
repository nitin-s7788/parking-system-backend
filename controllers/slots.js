// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from 'express';
import mongoose from 'mongoose';

import parkingSlots from "../models/parking.js";

// dotenv.config();


const router = express.Router();

export const getSlots = async (req, res) => { 
    try {
        const Slots = await parkingSlots.find();
                
        res.status(200).json(Slots);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getSlot = async (req, res) => { 
    const { id } = req.params;

    try {
        const Slot = await parkingSlots.findById(id);
        
        res.status(200).json(Slot);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createSlot = async (req, res) => {

    // if (!req.userId) {                                          // removing this compromise security
    //     return res.json({ message: "Unauthenticated" });
    //   }

    const Slot = req.body;

    const newSlot = new parkingSlots({ ...Slot })

    try {
        await newSlot.save();

        res.status(201).json(newSlot );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateSlot = async (req, res) => {

    
    // if (!req.userId) {
    //     return res.json({ message: "Unauthenticated" });
    //   }

    const { id } = req.params;
    const { free } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Slot with id: ${id}`);

    const oldSlot = await parkingSlots.findById(id);

    // const updatedPost = { ...oldPost, creator : creator, title : title, message : message, tags : tags, selectedFile : selectedFile };  this does not work correctly

    const updatedSlot = { _id : oldSlot._id, free : free };

    // console.log(updatedPost);

    await parkingSlots.findByIdAndUpdate(id, updatedSlot, { new: true });

    // console.log("hello");

    res.json(updatedSlot);
}

export const deleteSlot = async (req, res) => {
    const { id } = req.params;

    // if (!req.userId) {
    //     return res.json({ message: "Unauthenticated" });
    //   }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Slot with id: ${id}`);

    await parkingSlots.findByIdAndRemove(id);

    res.json({ message: "Slot deleted successfully." });
}


export default router;

// const secret = process.env.SECRET;

// export const signin = async (req, res) => {
//   //  console.log("sign in backend");
//     const { email, password } = req.body;

//   try {
//     const oldUser = await UserModal.findOne({ email });

//     if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

//     const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

//     if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

//     res.status(200).json({ result: oldUser, token });
//   } catch (err) {
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// export const signup = async (req, res) => {
//   const { email, password, firstName, lastName } = req.body;

//   try {
//     const oldUser = await UserModal.findOne({ email });

//     if (oldUser) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

//     const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

//     res.status(201).json({ result, token });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
    
//     console.log(error);
//   }
// };
