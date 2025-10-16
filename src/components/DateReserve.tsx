"use client"
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Select, MenuItem, TextField } from "@mui/material";
import { useState } from "react"; 
import { Dayjs } from "dayjs";

export default function DateReserve() {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
  const [venue, setVenue] = useState("Bloom");

  return (
    <form 
      className="bg-slate-100 rounded-lg w-fit px-8 py-6 flex flex-col gap-4 shadow-md"
    >
      {/* TextField สำหรับชื่อ-นามสกุล */}
      <TextField
        variant="standard"
        name="Name-Lastname"
        label="Name - Lastname"
        fullWidth
      />

      {/* TextField สำหรับเบอร์ติดต่อ */}
      <TextField
        variant="standard"
        name="Contact-Number"
        label="Contact Number"
        fullWidth
      />

      {/* DatePicker สำหรับเลือกวันที่จัดงาน */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 
          label="Event Date" 
          className="bg-white rounded-md"
          value={reserveDate} 
          onChange={(value) => { 
            setReserveDate(value); 
            alert(value);
          }}
        />
      </LocalizationProvider>

      {/* Select สำหรับเลือกสถานที่ */}
      <Select 
        variant="standard" 
        id="venue" 
        name="venue" 
        value={venue} 
        onChange={(e)=>setVenue(e.target.value)}
        displayEmpty
        className="w-[250px]"
      >
        <MenuItem value="" disabled>Select Venue</MenuItem>
        <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
        <MenuItem value="Spark">Spark Space</MenuItem>
        <MenuItem value="GrandTable">The Grand Table</MenuItem>
      </Select>

      {/* ปุ่มส่งฟอร์ม */}
      <button 
        type="submit" 
        className="bg-sky-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md shadow-md"
      >
        Reserve
      </button>
    </form>
  )
}
