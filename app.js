const express = require('express');
const path = require('path');
const multer = require('multer');  //อัปภาพสินค้า
const methodOverride = require('method-override'); //มี put/delete
const fs = require('fs');  //โหลด fs ใช้จัดการไฟล์ในเครื่อง

const dbConnection = require('./database');  //โหลด database connection
const app = express();  //สร้าง Express App

app.use(express.urlencoded({ extended:false }));  //รับข้อมูลจาก form
app.use(methodOverride('_method'));  //เปิดใช้ method override
app.use(express.static('public'));  //เปิด public folder
app.set('views', path.join(__dirname,'views'));  //ตั้งค่า views folder
app.set('view engine','ejs');  //ตั้ง Template Engine

//MULTER //กำหนดระบบเก็บไฟล์ภาพ
const storage = multer.diskStorage({  
    destination: (req,file,cb) => {
        cb(null, 'public/uploads');
    },

    filename: (req,file,cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

//สร้าง middleware upload
const upload = multer({ storage });

//HOME PAGE
app.get('/', (req, res) => {
    dbConnection.execute("SELECT * FROM products")  //ดึงข้อมูลสินค้า
    .then(([rows]) => {
        //ส่งข้อมูลไปแสดงใน Dashboard
        res.render('home', {
            products: rows
        });
    });
});

//ADD PAGE //เปิดหน้าเพิ่มสินค้า
app.get('/add', (req,res) => {
    res.render('add');  //แสดง add.ejs
});

//UINSERT PREDUCT  //รับข้อมูลจาก form เพิ่มสินค้า
app.post('/add', upload.single('image'), (req,res) =>{
    const { name, category, price, stock } = req.body;  //รับข้อมูล form
    const image = req.file.filename;  //รับชื่อรูป
    dbConnection.execute(
        //เพิ่มข้อมูลสินค้าเข้า DB
        `INSERT INTO products
        (name, category, price, stock, image)
        VALUES (?,?,?,?,?)`,

        [name, category, price, stock, image]
    )

    //กลับหน้า Dashboard
    .then(() => {
        res.redirect('/');
    });
});

//EDIT PAGE  //เปิดหน้าแก้ไขสินค้า
app.get('/edit/:id',(req,res) => {
    dbConnection.execute(
        "SELECT * FROM products WHERE id=?",  //ดึงข้อมูลสินค้า
        [req.params.id]
    )
    .then(([rows]) =>{
        //ส่งไป edit.ejs
        res.render('edit', {
            product: rows[0]
        });
    });
});

//UPDATE PRODUCT  //อัปเดตสินค้า
app.put('/edit/:id', upload.single('image'), (req,res) => {
    dbConnection.execute(
        "SELECT * FROM products WHERE id=?",
        [req.params.id]
    )
    .then(([rows]) => {
        let oldImage = rows[0].image;  //ดึงรูปเก่า
        let image = oldImage;
        //ถ้ามีอัปโหลดรูปใหม่
        if (req.file){
            //ลบรูปเก่า
            const imagePath = 'public/uploads/' + oldImage;
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log('ลบรูปสำเร็จ');
            } else {
                console.log('ไม่พบไฟล์:', imagePath);
            }
            image = req.file.filename;
        }
        dbConnection.execute(
            //แก้ไขข้อมูลสินค้า
            `UPDATE products
            SET name=?,
                category=?,
                price=?,
                stock=?,
                image=?
            WHERE id=?`,

            [
                req.body.name,
                req.body.category,
                req.body.price,
                req.body.stock,
                image,
                req.params.id
            ]
        )
        .then(() => {
            res.redirect('/');
        });
    });
});

//DELETE PRODUCT  //ลบสินค้า
app.delete('/delete/:id', (req,res) => {

    dbConnection.execute(
        "SELECT * FROM products WHERE id=?",
        [req.params.id]
    )

    .then(([rows]) => {
        let image = rows[0].image;
        const imagePath = path.join(__dirname, 'public', 'uploads', image);
        // เช็กก่อนลบ
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log('ลบรูปสำเร็จ');
        } else {
            console.log('ไม่พบรูป:', imagePath);
        }

        // ลบข้อมูลใน database
        dbConnection.execute(
            "DELETE FROM products WHERE id=?",
            [req.params.id]
        )

        .then(() => {
            res.redirect('/');
        });

    });

});

//SERVER  //รัน server ที่ port 5000
app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});
