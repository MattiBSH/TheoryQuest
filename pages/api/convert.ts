// npm install xlsx

// pages/api/convert-excel.js
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import * as XLSX from 'xlsx';

export interface ExcelRow {
    question: string;
    correctAnswer: string;
    answers: string;
    info?: string;
  }
  
  export interface FormattedQuestion {
    question: string;
    correctAnswer: string;
    answers: string[];
    info?: string;
  }
  
export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse<FormattedQuestion[] | { error: string }>
  ) {
    try {
      console.log('Request received');
      // Path to your Excel file
      const filePath = path.join(process.cwd(), 'app','data', 'driving-control-questions.xlsx')
      console.log(filePath);
      // Read the Excel file
      const fileBuffer = await fs.readFile(filePath);
      const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
      

      // Get the first worksheet
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      // Convert the worksheet to JSON
      const rawData = XLSX.utils.sheet_to_json(worksheet) as ExcelRow[];
      
      // Process the data to match your desired format
      const formattedData: FormattedQuestion[] = rawData.map((row: ExcelRow) => {
        return {
          question: row.question,
          correctAnswer: row.correctAnswer,
          // Split the answers by semicolon and trim whitespace
          answers: row.answers.split(';').map(answer => answer.trim()),
          // Only include info if it exists
          ...(row.info && { info: row.info })
        };
      });
      
      // Return the JSON data
      console.log(formattedData);
      res.status(200).json(formattedData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: errorMessage });
    }
  }