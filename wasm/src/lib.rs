
extern crate wasm_bindgen;

extern crate console_error_panic_hook;


use wasm_bindgen::prelude::*;

use wasm_bindgen::Clamped;

use web_sys::{ ImageData, console };

use std::panic;


use js_sys::Math:: { sqrt, floor };



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

// macro_rules! log {
//     ( $( $t:tt )* ) => {
//         console::log_1(&format!( $( $t )* ).into());
//     }
// }

fn clamp(input: f32, min: f32, max: f32) -> u8 {
    if input > max {
    max as u8
}
else if input < min {
    min as u8
} else {
    input as u8
}
}

#[wasm_bindgen]
     pub fn convolve(val: ImageData, kernel: &[i16], amount: f32) -> std::result::Result<web_sys::ImageData, wasm_bindgen::JsValue>{
         panic::set_hook(Box::new(console_error_panic_hook::hook));
         let imageHeight: u32 = val.height();
         let imageWidth: u32 = val.width();
         let pixelData  = val.data();
         let side: u32 = sqrt(kernel.len() as f64) as u32;
         let half: u32 = floor((side / 2).into()) as u32;
         let mut outputPixelData = val.data().clone();
         for y in 0..imageHeight {
             for x in 0..imageWidth {
                 let dstOff = (y * imageWidth + x) * 4;
                 let mut totalR = 0;
                 let mut totalG = 0;
                 let mut totalB = 0;
                 for row in 0..side {
                     for col in 0..side {
                         let srcY = y + row - half;
                         let srcX = x + col - half;
                         if srcY < 0 || srcY >= imageHeight || srcX < 0 || srcX >= imageWidth {
                                continue
                         }
                        let srcOff = (srcY * imageWidth + srcX) * 4;
                        let weight = kernel[(row * side + col) as usize];
                        let [r, g, b] = [
                        pixelData[srcOff as usize],
                        pixelData[(srcOff + 1) as usize],
                        pixelData[(srcOff + 2) as usize]
                        ];
                        totalR += r as i16  * weight;
                        totalG += g as i16  * weight;
                        totalB += b as i16  * weight;
                     }
                 }
                if amount > 0.0 {
                    outputPixelData[dstOff as usize] =
                        clamp(totalR as f32 * amount + outputPixelData[dstOff as usize] as f32 * (1.0 - amount), 0.0, 255.0 );
                    outputPixelData[(dstOff + 1) as usize] =
                         clamp(totalG as f32 * amount + outputPixelData[(dstOff + 1) as usize] as f32 * (1.0 - amount), 0.0, 255.0 );
                    outputPixelData[(dstOff + 2) as usize] =
                         clamp(totalB as f32 * amount + outputPixelData[(dstOff + 2) as usize] as f32 * (1.0 - amount), 0.0, 255.0 );
                    }
             }
         }
         ImageData::new_with_u8_clamped_array_and_sh(Clamped(&mut outputPixelData), imageWidth, imageHeight)
    }