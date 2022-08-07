import React, { createContext, useState,  } from 'react'
import FeedbackData from '../data/FeedbackData'
import {v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    
 //State

    const [feedback, setFeedback] = useState(FeedbackData)

    const [feedbackEdit, setFeedbackEdit] = useState({
        item:{},
        edit: false
    })


//Edit Feedback
    const editFeedback = (item) =>{
        setFeedbackEdit({
            item,
            edit: true
        })
    }

//Delete Feedback
    const deleteFeedback = (id) =>{
        if(window.confirm('Are you sure you want to delete the feedback?')){
            setFeedback(feedback.filter((item)=> item.id !== id))
        }
    }

//Add Feedback
    const addFeedback =(newFeedback) =>{
      
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback])
        
    }

//Update Feedback
    const updateFeedback = (id, updItem) =>{
        setFeedback(feedback.map((item) => ( 
            item.id === id ? {...item, ...updItem} : item
        )
        ))
    }


    return <FeedbackContext.Provider 
    value={{
        feedback,
        feedbackEdit,
        setFeedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,

    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext