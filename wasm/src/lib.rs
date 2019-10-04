
extern crate wasm_bindgen;

extern crate console_error_panic_hook;

use wasm_bindgen::prelude::*;

use web_sys::{ ImageData, console };

use std::panic;



#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;


#[wasm_bindgen]
pub fn fib(i: u32) -> u32 {
    match i {
        0 => 0,
        1 => 1,
        _ => fib(i-1) + fib(i-2)
    }
}

// #[wasm_bindgen]
// pub fn receive_example_from_js(val: &JsValue) -> JsValue {
//     panic::set_hook(Box::new(console_error_panic_hook::hook));
//     let mut image: Vec<u32> = val.into_serde().unwrap();
//     let mut count = 0;
//         while count < image.len() {
//             let avg: u32 = (image[count] + image[count + 1] + image[count + 2]) / 3;
//             image[count] = avg; // red
//             image[count + 1] = avg; // green
//             image[count + 2] = avg; // blue
//             count = count + 4;
//         }
//     JsValue::from_serde(&image).unwrap()
// }

// pub unsafe fn transmuteClamp(val: u16) -> u8{
//     if val > 255 {
//         return 255
//     } else if val < 0 {
//         return 0
//     }
//         return val as u8
// }
// #[wasm_bindgen]
// pub fn receive_example_from_js(mut val: Clamped<Vec<u8>>) -> Clamped<Vec<u8>> {
//     panic::set_hook(Box::new(console_error_panic_hook::hook));
//     let mut count = 0;
//         while count < val.len() {
//         let tmp  = (val[count] as u16 + val[count + 1] as u16   + val[count + 2] as u16  ) / 3  as u16;
//         val[count] = tmp as u8; // red
//         val[count + 1] = tmp as u8; // green
//         val[count + 2] = tmp as u8; // blue
//         count = count + 4;
//         }

//     val
// }


// pub fn fizzbuzz(n: u32) -> () {
//     if 2 > 1 {
//         println!("fizzbuzz");
//     }  else {
//         println!("{}", n);
//     }
// }
#[wasm_bindgen]
     pub fn receive_example_from_js(val: &mut[u8]) -> () {
         panic::set_hook(Box::new(console_error_panic_hook::hook));
        // panic::set_hook(Box::new(console_error_panic_hook::hook));
        let mut count = 0;
            while count < val.len() {
            let tmp  = (val[count] as u16 + val[count + 1] as u16 + val[count + 2] as u16) / 3  as u16;
            val[count] = tmp as u8; // red
            val[count + 1] = tmp as u8; // green
            val[count + 2] = tmp as u8; // blue
            count = count + 4;
            }
        // val
    }

// #[wasm_bindgen]
// pub fn send_example_to_js() -> JsValue {
//     let mut field1 = HashMap::new();
//     field1.insert(0, String::from("ex"));
//     let example = Example {
//         field1,
//         field2: vec![vec![1., 2.], vec![3., 4.]],
//         field3: [1., 2., 3., 4.]
//     };

//     JsValue::from_serde(&example).unwrap()
// }


macro_rules! log {
    ( $( $t:tt )* ) => {
        console::log_1(&format!( $( $t )* ).into());
    }
}

// }
#[wasm_bindgen]
     pub fn convolve(val: ImageData, kernel: &[i8], amount: i8) -> () {
         panic::set_hook(Box::new(console_error_panic_hook::hook));
       log!("{}", val.height())
        //  const imageWidth = v
        // panic::set_hook(Box::new(console_error_panic_hook::hook));

        // va
    }


// export const convolve = (imageData, kernel, amount) => {
//   const pixelData = imageData.data
//   const imageWidth = imageData.width
//   const imageHeight = imageData.height
//   // 這邊需要複製一份新的資料是因為接下來算權重的時候我們需要用原本的值去做計算，不是已經計算過權重的值
//   const output = new ImageData(
//     new Uint8ClampedArray(imageData.data),
//     imageData.width,
//     imageData.height
//   )
//   // 尋找單邊長度，矩陣通常為奇數 3 * 3 , 5 * 5 ...
//   const side = Math.sqrt(kernel.length)
//   const half = Math.floor(side / 2)
//   const outputPixelData = output.data

//   for (let y = 0; y < imageHeight; y++) {
//     for (let x = 0; x < imageWidth; x++) {
//       const dstOff = (y * imageWidth + x) * 4
//       let totalR = 0
//       let totalG = 0
//       let totalB = 0
//       for (let row = 0; row < side; row++) {
//         for (let col = 0; col < side; col++) {
//           // 尋找範圍內座標
//           const srcY = y + row - half
//           const srcX = x + col - half

//           // 如果範圍超出，退出 ex 最左上角之點
//           if (srcY < 0 || srcY > imageHeight || srcX < 0 || srcX > imageWidth) {
//             continue
//           }

//           const srcOff = (srcY * imageWidth + srcX) * 4
//           const weight = kernel[row * side + col]
//           const [r, g, b] = [
//             pixelData[srcOff],
//             pixelData[srcOff + 1],
//             pixelData[srcOff + 2]
//           ]
//           totalR += r * weight
//           totalG += g * weight
//           totalB += b * weight
//         }
//       }
//       if (amount) {
//         outputPixelData[dstOff] =
//           totalR * amount + outputPixelData[dstOff] * (1 - amount)
//         outputPixelData[dstOff + 1] =
//           totalG * amount + outputPixelData[dstOff + 1] * (1 - amount)
//         outputPixelData[dstOff + 2] =
//           totalB * amount + outputPixelData[dstOff + 2] * (1 - amount)
//       } else {
//         outputPixelData[dstOff] = totalR
//         outputPixelData[dstOff + 1] = totalG
//         outputPixelData[dstOff + 2] = totalB
//       }
//     }
//   }
//   return output
// }
