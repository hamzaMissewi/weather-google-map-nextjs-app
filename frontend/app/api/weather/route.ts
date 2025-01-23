import {NextRequest, NextResponse} from "next/server";

export default async function handler(req:NextRequest) {
  try{
  const response = await fetch('http://localhost:8000/weather/');
  const data = await response.json();
  // res.status(200).json(data[0]); // Assuming the API returns an array and we take the first item
  return NextResponse.json(data[0]);
  }catch (error){
    return NextResponse.json({error: error},{status:400})
  }
}