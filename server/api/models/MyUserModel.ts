/**
 * Represents a client
 * 
 * This model could actually be merged with MovieRatingModel.
 */


import * as mongoose from 'mongoose';
import MyUser from '../../../types/MyUser';
const Schema = mongoose.Schema;

interface MyUserSchemaDocument extends MyUser, mongoose.Document {}

const MyUserSchema = new mongoose.Schema({
  ratings: [{ type: Schema.Types.ObjectId, ref: 'MyRating' }]
},
{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

const MyUserModel = mongoose.model<MyUserSchemaDocument>('MyUser', MyUserSchema);
export = MyUserModel;