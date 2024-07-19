// import { db } from '@/lib/db';
// import { NextRequest, NextResponse } from 'next/server';
// import cloudinary from '@/lib/cloudinary';
// import formidable, { File } from 'formidable';
// import { IncomingMessage } from 'http';

// interface FormidableFile extends File {
//   filepath: string;
// }

// export const POST = async (req: NextRequest) => {
//   const form = new formidable.IncomingForm();

//   return new Promise<NextResponse>((resolve) => {
//     form.parse(req as unknown as IncomingMessage, async (err, fields, files) => {
//       if (err) {
//         console.error('Error parsing form:', err);
//         return resolve(NextResponse.json({ error: 'Error parsing form', details: err.message }, { status: 500 }));
//       }

//       try {
//         const { fullName, address, timing, phoneNumber, details } = fields;

//         if (!fullName || !address || !timing || !phoneNumber || !details) {
//           return resolve(NextResponse.json({ error: 'All fields are required' }, { status: 400 }));
//         }

//         let pictureUrl = '';
//         if (files.picture) {
//           const file = files.picture as unknown as FormidableFile;
//           const result = await cloudinary.uploader.upload(file.filepath);
//           pictureUrl = result.secure_url;
//         }

//         const booking = await db.booking.create({
//           data: {
//             fullName: fullName as unknown as string,
//             address: address as unknown as string,
//             timing: new Date(timing as unknown as string),
//             phoneNumber: phoneNumber as unknown as string,
//             details: details as unknown as string,
//             pictureUrl,
//           },
//         });

//         return resolve(NextResponse.json({ booking }, { status: 201 }));
//       } catch (error) {
//         console.error('Error creating booking:', error);
//         return resolve(NextResponse.json({ error: 'Error creating booking'}, { status: 500 }));
//       }
//     });
//   });
// };

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
