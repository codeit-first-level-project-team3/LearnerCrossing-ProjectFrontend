import gray from "../../assets/stickers/sticker_empty.svg";
import light_green01 from "../../assets/stickers/sticker_light_green_100_01.svg";
import light_green02 from "../../assets/stickers/sticker_light_green_100_02.svg";
import light_green03 from "../../assets/stickers/sticker_light_green_100_03.svg";
import light_mint04 from "../../assets/stickers/sticker_light_mint_100_04.svg";
import light_mint05 from "../../assets/stickers/sticker_light_mint_200_05.svg";
import green06 from "../../assets/stickers/sticker_green_06.svg";
import blue07 from "../../assets/stickers/sticker_blue_100_07.svg";
import blue08 from "../../assets/stickers/sticker_blue_200_08.svg";
import blue09 from "../../assets/stickers/sticker_blue_300_09.svg";
import purple10 from "../../assets/stickers/sticker_purple_100_10.svg";
import purple11 from "../../assets/stickers/sticker_purple_200_11.svg";
import purple12 from "../../assets/stickers/sticker_purple_300_12.svg";
import yellow13 from "../../assets/stickers/sticker_yellow_100_13.svg";
import yellow14 from "../../assets/stickers/sticker_yellow_200_14.svg";
import yellow15 from "../../assets/stickers/sticker_yellow_300_15.svg";
import pink16 from "../../assets/stickers/sticker_pink_100_16.svg";
import pink17 from "../../assets/stickers/sticker_pink_200_17.svg";
import pink18 from "../../assets/stickers/sticker_pink_300_18.svg";

function Sticker({ color = "empty", num = 0 }) {
  const stickers = {
    empty: [gray],
    green: [
      light_green01,
      light_green02,
      light_green03,
      light_mint04,
      light_mint05,
      green06,
    ],
    blue: [blue07, blue08, blue09],
    purple: [purple10, purple11, purple12],
    yellow: [yellow13, yellow14, yellow15],
    pink: [pink16, pink17, pink18],
  };

  const stickerColor = stickers[color][num] || stickers.empty[0]; //없는 색상 array 접근 시 empty로 고정

  return <img src={stickerColor} alt={stickers[color[num]]} />;
}

export default Sticker;
