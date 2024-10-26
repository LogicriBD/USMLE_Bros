"use client"
import SideBar from "@/src/components/Upload/SideBar";
import AuthStateManager from "@/src/context/AuthStateManager"
import { withAdminPriviledges } from "@/src/hoc/withAdminPrivileges";
import { useState } from "react";

const UploadPage = () => {

    const [categories, setCategories] = useState(["Anatomy", "Physiology", "Biochemistry", "Pathology", "Pharmacology", "Microbiology", "Forensic Medicine", "Community Medicine", "ENT", "Ophthalmology", "Medicine", "Surgery", "Pediatrics", "OBG", "Orthopedics", "Dermatology", "Psychiatry", "Radiology", "Anesthesia", "Dentistry", "Emergency Medicine", "General Practice", "Nursing", "Physiotherapy", "Occupational Therapy", "Speech Therapy", "Dietetics", "Nutrition", "Pharmacy", "Medical Laboratory Technology", "Radiography", "Optometry", "Biomedical Engineering", "Biotechnology", "Genetics", "Bioinformatics", "Nursing", "Physiotherapy", "Occupational Therapy", "Speech Therapy", "Dietetics", "Nutrition", "Pharmacy", "Medical Laboratory Technology", "Radiography", "Optometry", "Biomedical Engineering", "Biotechnology", "Genetics", "Bioinformatics", "Nursing", "Physiotherapy", "Occupational Therapy", "Speech Therapy", "Dietetics", "Nutrition", "Pharmacy", "Medical Laboratory Technology", "Radiography", "Optometry", "Biomedical Engineering", "Biotechnology", "Genetics", "Bioinformatics", "Nursing", "Physiotherapy", "Occupational Therapy", "Speech Therapy", "Dietetics", "Nutrition", "Pharmacy", "Medical Laboratory Technology", "Radiography", "Optometry", "Biomedical Engineering", "Biotechnology", "Genetics", "Bioinformatics", "Nursing", "Physiotherapy", "Occupational Therapy", "Speech Therapy", "Dietetics", "Nutrition", "Pharmacy", "Medical Laboratory Technology", "Radiography", "Optometry", "Biomedical Engineering", "Biotechnology", "Genetics", "Bioinformatics", "Nursing", "Physiotherapy", "Occupational Therapy", "Speech Therapy", "Dietetics", "Nutrition", "Pharmacy", "Medical Laboratory Technology", "Radiography", "Optometry", "Biomedical Engineering", "Biotechnology", "Genetics", "Bioinformatics", "Nursing", "Physiotherapy", "Occupational Therapy", "Speech Therapy", "Dietetics", "Nutrition", "Pharmacy", "Medical Laboratory Technology"]);

    return(
        <AuthStateManager>
            <>
               <SideBar categories={categories}/>
            </>
        </AuthStateManager>
    )
}

export default withAdminPriviledges(UploadPage);