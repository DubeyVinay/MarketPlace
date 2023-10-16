import * as Yup from "yup";

export const createNFTSchema = Yup.object({
  //   NFTImage: Yup.mixed().required("Requird!"),
  NFTName: Yup.string().required("Requird!"),
  NFTDescription: Yup.string().required("Requird!"),
  NFTPrice: Yup.number().moreThan(0).required("Requird!"),
  NFTRoyalty: Yup.number().moreThan(0).required("Requird!"),
});
