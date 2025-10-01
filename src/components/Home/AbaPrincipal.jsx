import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PedidoContext } from "../Pedido/Pedido";
import { ProductModal } from "./modal";
import "./index.css";
import {
  FaInstagram,
  FaRegEnvelope,
  FaFacebookSquare,
  FaTrashAlt,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaBolt,
  FaChevronDown,
} from "react-icons/fa";
import logo from "../../assets/logo.png";


function getNormalizedFileName(productName) {
  return productName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "");
}

const imageModules = import.meta.glob('../../assets/imagens/*.{png,jpg,jpeg,svg}', { eager: true });

function getImageFromFileName(fileName) {
    const filePath = `../../assets/imagens/${fileName}`;
    return imageModules[filePath]?.default || null;
}

 const produtos = {
  
  // ================= FRUTÍFERAS =================
  prod1: { nome: "Acerola", tipo: "Frutífera", descricao: "Muda de acerola saudável." },
  prod2: { nome: "Abacate", tipo: "Frutífera", descricao: "Muda de abacateiro produtivo." },
  prod3: { nome: "Acerola Estaquia", tipo: "Frutífera", descricao: "Muda de acerola propagada por estaquia." },
  prod4: { nome: "Abil (Amarelo / Roxo)", tipo: "Frutífera", descricao: "Muda de Abil amarelo ou roxo." },
  prod5: { nome: "Abricó", tipo: "Frutífera", descricao: "Muda de Abricó." },
  prod6: { nome: "Ameixa Preta Enxerto", tipo: "Frutífera", descricao: "Muda enxertada de ameixa preta." },
  prod7: { nome: "Amora Gigante", tipo: "Frutífera", descricao: "Muda de amora gigante." },
  prod8: { nome: "Araçá", tipo: "Frutífera", descricao: "Muda de araçá." },
  prod9: { nome: "Araticum", tipo: "Frutífera", descricao: "Muda de araticum." },
  prod10: { nome: "Atemóia", tipo: "Frutífera", descricao: "Muda de atemóia." },
  prod11: { nome: "Bacupari", tipo: "Frutífera", descricao: "Muda de bacupari." },
  prod12: { nome: "Biriba", tipo: "Frutífera", descricao: "Muda de biriba." },
  prod13: { nome: "Cabeludinha", tipo: "Frutífera", descricao: "Muda de cabeludinha." },
  prod14: { nome: "Cacau", tipo: "Frutífera", descricao: "Muda de cacau." },
  prod15: { nome: "Cagaita", tipo: "Frutífera", descricao: "Muda de cagaita." },
  prod16: { nome: "Caja Manga", tipo: "Frutífera", descricao: "Muda de caja manga." },
  prod17: { nome: "Caja Mirim", tipo: "Frutífera", descricao: "Muda de caja mirim produzindo." },
  prod18: { nome: "Caju", tipo: "Frutífera", descricao: "Muda de cajueiro." },
  prod19: { nome: "Caju Produzindo", tipo: "Frutífera", descricao: "Cajueiro já produzindo." },
  prod20: { nome: "Camomila", tipo: "Frutífera", descricao: "Muda de camomila." },
  prod21: { nome: "Canela", tipo: "Frutífera", descricao: "Muda de canela." },
  prod22: { nome: "Caqui (Enxerto)", tipo: "Frutífera", descricao: "Muda enxertada de caqui." },
  prod23: { nome: "Carambola", tipo: "Frutífera", descricao: "Muda de caramboleira." },
  prod24: { nome: "Carambola Enxerto Sacolão", tipo: "Frutífera", descricao: "Muda enxertada de carambola." },
  prod25: { nome: "Castanha do Pará", tipo: "Frutífera", descricao: "Muda de castanha do Pará." },
  prod26: { nome: "Castanha Portuguesa", tipo: "Frutífera", descricao: "Muda de castanha portuguesa." },
  prod27: { nome: "Cereja", tipo: "Frutífera", descricao: "Muda de cerejeira." },
  prod28: { nome: "Siriguela", tipo: "Frutífera", descricao: "Muda de siriguela." },
  prod29: { nome: "Coco Sacolão (1,20 mt)", tipo: "Frutífera", descricao: "Muda de coco sacolão 1,20 mt." },
  prod30: { nome: "Coco Sacolão (1,80 mt)", tipo: "Frutífera", descricao: "Muda de coco sacolão 1,80 mt." },
  prod31: { nome: "Coco Sacolão (2,50 mts)", tipo: "Frutífera", descricao: "Muda de coco sacolão 2,50 mt." },
  prod32: { nome: "Cravo", tipo: "Frutífera", descricao: "Muda de cravo." },
  prod33: { nome: "Cupuaçu", tipo: "Frutífera", descricao: "Muda de cupuaçu." },
  prod34: { nome: "Framboesa", tipo: "Frutífera", descricao: "Muda de framboesa." },
  prod35: { nome: "Figo", tipo: "Frutífera", descricao: "Muda de figueira." },
  prod36: { nome: "Figo Produzindo", tipo: "Frutífera", descricao: "Muda de figueira já produzindo." },
  prod37: { nome: "Fruta Pão (Raiz)", tipo: "Frutífera", descricao: "Muda de fruta pão por raiz." },
  prod38: { nome: "Fruta Pão (Semente)", tipo: "Frutífera", descricao: "Muda de fruta pão por semente." },
  prod39: { nome: "Fruta do Conde", tipo: "Frutífera", descricao: "Muda de fruta do conde." },
  prod40: { nome: "Guabiroba", tipo: "Frutífera", descricao: "Muda de guabiroba." },
  prod41: { nome: "Graviola", tipo: "Frutífera", descricao: "Muda de graviola." },
  prod42: { nome: "Graviola Sacolão Enxertada", tipo: "Frutífera", descricao: "Muda enxertada de graviola." },
  prod43: { nome: "Goiaba Paluma vermelha ", tipo: "Frutífera", descricao: "Muda de goiaba paluma vermelha." },
  prod44: { nome: "Goiaba Branca", tipo: "Frutífera", descricao: "Muda de goiaba branca." },
  prod45: { nome: "Goiaba Tailandesa", tipo: "Frutífera", descricao: "Muda de goiaba tailandesa." },
  prod46: { nome: "Groselha", tipo: "Frutífera", descricao: "Muda de groselha." },
  prod47: { nome: "Jabuticaba Produzindo (2,0m)", tipo: "Frutífera", descricao: "Jabuticabeira produzindo 2m." },
  prod48: { nome: "Jabuticaba (Sacolão Produzindo)", tipo: "Frutífera", descricao: "Jabuticabeira sacolão produzindo." },
  prod49: { nome: "Jabuticaba Produzindo (1,5m)", tipo: "Frutífera", descricao: "Jabuticabeira produzindo 1,5m." },
  prod50: { nome: "Jaca", tipo: "Frutífera", descricao: "Muda de jaqueira." },
  prod51: { nome: "Jambo", tipo: "Frutífera", descricao: "Muda de jambo." },
  prod52: { nome: "Jambolão", tipo: "Frutífera", descricao: "Muda de jambolão." },
  prod53: { nome: "Jatobá", tipo: "Frutífera", descricao: "Muda de jatobá." },
  prod54: { nome: "Jenipapo", tipo: "Frutífera", descricao: "Muda de jenipapo." },
  prod55: { nome: "Kiwi Enxerto", tipo: "Frutífera", descricao: "Muda enxertada de kiwi." },
  prod56: { nome: "Langonha", tipo: "Frutífera", descricao: "Muda de langonha." },
  prod57: { nome: "Lichia (Enxerto)", tipo: "Frutífera", descricao: "Muda enxertada de lichia." },
  prod58: { nome: "Lichia (Pé Franco)", tipo: "Frutífera", descricao: "Muda de lichia pé franco." },
  prod59: { nome: "Louro", tipo: "Frutífera", descricao: "Muda de louro." },
  prod60: { nome: "Maçã", tipo: "Frutífera", descricao: "Muda de macieira." },
  prod61: { nome: "Mamão", tipo: "Frutífera", descricao: "Muda de mamoeiro." },
  prod62: { nome: "Mangabá", tipo: "Frutífera", descricao: "Muda de mangabeira." },
  prod63: { nome: "Mangostão", tipo: "Frutífera", descricao: "Muda de mangostão." },
  prod64: { nome: "Maracujá", tipo: "Frutífera", descricao: "Muda de maracujá." },
  prod65: { nome: "Marmelo", tipo: "Frutífera", descricao: "Muda de marmelo." },
  prod66: { nome: "Morango", tipo: "Frutífera", descricao: "Muda de morangueiro." },
  prod67: { nome: "Nectarina", tipo: "Frutífera", descricao: "Muda de nectarina." },
  prod68: { nome: "Nêspera", tipo: "Frutífera", descricao: "Muda de nespereira." },
  prod69: { nome: "Noz Macadâmia", tipo: "Frutífera", descricao: "Muda de noz macadâmia." },
  prod70: { nome: "Noz Pecã", tipo: "Frutífera", descricao: "Muda de noz pecã." },
  prod71: { nome: "Palmito Açaí", tipo: "Frutífera", descricao: "Muda de palmito açaí." },
  prod72: { nome: "Palmito Pupunha C/ Espinho", tipo: "Frutífera", descricao: "Muda de pupunha com espinho." },
  prod73: { nome: "Palmito Pupunha S/ Espinho", tipo: "Frutífera", descricao: "Muda de pupunha sem espinho." },
  prod74: { nome: "Pequi", tipo: "Frutífera", descricao: "Muda de pequi." },
  prod75: { nome: "Pera", tipo: "Frutífera", descricao: "Muda de pereira." },
  prod76: { nome: "Pêssego", tipo: "Frutífera", descricao: "Muda de pessegueiro." },
  prod77: { nome: "Pinha", tipo: "Frutífera", descricao: "Muda de pinha." },
  prod78: { nome: "Pinhão", tipo: "Frutífera", descricao: "Muda de pinhão." },
  prod79: { nome: "Pitangueira", tipo: "Frutífera", descricao: "Muda de pitanga." },
  prod80: { nome: "Pitomba", tipo: "Frutífera", descricao: "Muda de pitomba." },
  prod81: { nome: "Romã", tipo: "Frutífera", descricao: "Muda de romã." },
  prod82: { nome: "Sapoti Enxerto", tipo: "Frutífera", descricao: "Muda enxertada de sapoti." },
  prod83: { nome: "Urucum", tipo: "Frutífera", descricao: "Muda de urucum." },
  prod84: { nome: "Uva (Rubi/Itália/Niágara/Rosa/Branca)", tipo: "Frutífera", descricao: "Mudas de uva variadas." },
  prod85: { nome: "Uvaia", tipo: "Frutífera", descricao: "Muda de uvaia." },

  // ================= ORNAMENTAIS =================
  prod86: { nome: "Ixória", tipo: "Ornamental", descricao: "Planta ornamental Ixória." },
  prod87: { nome: "Alamandra (Amarela/Vermelha)", tipo: "Ornamental", descricao: "Planta ornamental Alamandra amarela ou vermelha." },
  prod88: { nome: "Azaleia", tipo: "Ornamental", descricao: "Planta ornamental Azaleia." },
  prod89: { nome: "Bico de Papagaio", tipo: "Ornamental", descricao: "Planta ornamental Bico de Papagaio." },
  prod90: { nome: "Bromélia", tipo: "Ornamental", descricao: "Planta ornamental Bromélia." },
  prod91: { nome: "Buchinho G", tipo: "Ornamental", descricao: "Planta ornamental Buchinho grande." },
  prod92: { nome: "Buchinho M", tipo: "Ornamental", descricao: "Planta ornamental Buchinho médio." },
  prod93: { nome: "Buchinho P", tipo: "Ornamental", descricao: "Planta ornamental Buchinho pequeno." },
  prod94: { nome: "Buganvili (Estaca)", tipo: "Ornamental", descricao: "Planta ornamental Buganvili por estaca." },
  prod95: { nome: "Buganvili Bonzai (Pote)", tipo: "Ornamental", descricao: "Planta ornamental Buganvili Bonzai em pote." },
  prod96: { nome: "Buganvili Bonzai (Sacolão)", tipo: "Ornamental", descricao: "Planta ornamental Buganvili Bonzai em sacolão." },
  prod97: { nome: "Camarão", tipo: "Ornamental", descricao: "Planta ornamental Camarão." },
  prod98: { nome: "Camélia", tipo: "Ornamental", descricao: "Planta ornamental Camélia." },
  prod99: { nome: "Crotons", tipo: "Ornamental", descricao: "Planta ornamental Crotons." },
  prod100: { nome: "Dama da Noite", tipo: "Ornamental", descricao: "Planta ornamental Dama da Noite." },
  prod101: { nome: "Dracena Tricolor (Sacolão)", tipo: "Ornamental", descricao: "Planta ornamental Dracena Tricolor em sacolão." },
  prod102: { nome: "Espirradeira (Branca/Rosa/Vermelha)", tipo: "Ornamental", descricao: "Planta ornamental Espirradeira." },
  prod103: { nome: "Estrelitza (Sacolão)", tipo: "Ornamental", descricao: "Planta ornamental Estrelitza em sacolão." },
  prod104: { nome: "Eugenia (Sacolão)", tipo: "Ornamental", descricao: "Planta ornamental Eugenia em sacolão." },
  prod105: { nome: "Hibisco (Enxerto)", tipo: "Ornamental", descricao: "Planta ornamental Hibisco enxertado." },
  prod106: { nome: "Hortência", tipo: "Ornamental", descricao: "Planta ornamental Hortência." },
  prod107: { nome: "Hórquia Bambu (Sacolão)", tipo: "Ornamental", descricao: "Planta ornamental Hórquia Bambu em sacolão." },
  prod108: { nome: "Ipês (Branco/Roxo/Rosa/Amarelo)", tipo: "Ornamental", descricao: "Planta ornamental Ipê em diversas cores." },
  prod109: { nome: "Jade", tipo: "Ornamental", descricao: "Planta ornamental Jade." },
  prod110: { nome: "Jasmim", tipo: "Ornamental", descricao: "Planta ornamental Jasmim." },
  prod111: { nome: "Lágrima de Cristo", tipo: "Ornamental", descricao: "Planta ornamental Lágrima de Cristo." },
  prod112: { nome: "Manacá da Serra Grande", tipo: "Ornamental", descricao: "Planta ornamental Manacá da Serra Grande." },
  prod113: { nome: "Manacá da Serra Pequeno", tipo: "Ornamental", descricao: "Planta ornamental Manacá da Serra Pequeno." },
  prod114: { nome: "Moreia (Pote)", tipo: "Ornamental", descricao: "Planta ornamental Moreia em pote." },
  prod115: { nome: "Moreia (Sacola)", tipo: "Ornamental", descricao: "Planta ornamental Moreia em sacola." },
  prod116: { nome: "Mussaenda (Branca/Rosa/Vermelha)", tipo: "Ornamental", descricao: "Planta ornamental Mussaenda em diversas cores." },
  prod117: { nome: "Oliveira", tipo: "Ornamental", descricao: "Planta ornamental Oliveira." },
  prod118: { nome: "Palmeira Cia Forte", tipo: "Ornamental", descricao: "Palmeira ornamental Cia Forte." },
  prod119: { nome: "Palmeira Imperial", tipo: "Ornamental", descricao: "Palmeira ornamental Imperial." },
  prod120: { nome: "Palmeira Leque (Pote)", tipo: "Ornamental", descricao: "Palmeira ornamental Leque em pote." },
  prod121: { nome: "Palmeira Leque (Sacolão)", tipo: "Ornamental", descricao: "Palmeira ornamental Leque em sacolão." },
  prod122: { nome: "Palmeira Leque G", tipo: "Ornamental", descricao: "Palmeira ornamental Leque grande." },
  prod123: { nome: "Palmeira Leque M", tipo: "Ornamental", descricao: "Palmeira ornamental Leque médio." },
  prod124: { nome: "Palmeira Leque P", tipo: "Ornamental", descricao: "Palmeira ornamental Leque pequeno." },
  prod125: { nome: "Palmeira Rabo de Peixe (G)", tipo: "Ornamental", descricao: "Palmeira ornamental Rabo de Peixe grande." },
  prod126: { nome: "Palmeira Rabo de Peixe (M)", tipo: "Ornamental", descricao: "Palmeira ornamental Rabo de Peixe média." },
  prod127: { nome: "Palmeira Rabo de Peixe (P)", tipo: "Ornamental", descricao: "Palmeira ornamental Rabo de Peixe pequena." },
  prod128: { nome: "Palmeira Real (Sacolão)", tipo: "Ornamental", descricao: "Palmeira ornamental Real em sacolão." },
  prod129: { nome: "Palmeira Triangular (Sacolão)", tipo: "Ornamental", descricao: "Palmeira ornamental Triangular em sacolão." },
  prod130: { nome: "Palmeira Vitoria Regia", tipo: "Ornamental", descricao: "Palmeira ornamental Vitória Régia." },
  prod131: { nome: "Palmeira Washingtonia (Sacolão)", tipo: "Ornamental", descricao: "Palmeira ornamental Washingtonia em sacolão." },
  prod132: { nome: "Pata de Vaca (Sacolão)", tipo: "Ornamental", descricao: "Planta ornamental Pata de Vaca em sacolão." },
  prod133: { nome: "Pau Brasil", tipo: "Ornamental", descricao: "Planta ornamental Pau Brasil." },
  prod134: { nome: "Pau Ferro", tipo: "Ornamental", descricao: "Planta ornamental Pau Ferro." },
  prod135: { nome: "Pau Viola", tipo: "Ornamental", descricao: "Planta ornamental Pau Viola." },
  prod136: { nome: "Pinha do Brejo (Sacolão)", tipo: "Ornamental", descricao: "Planta ornamental Pinha do Brejo em sacolão." },
  prod137: { nome: "Primavera (Estaca)", tipo: "Ornamental", descricao: "Planta ornamental Primavera por estaca." },
  prod138: { nome: "Primavera (P)", tipo: "Ornamental", descricao: "Planta ornamental Primavera pequena." },
  prod139: { nome: "Primavera (G)", tipo: "Ornamental", descricao: "Planta ornamental Primavera grande." },
  prod140: { nome: "Resedá (Estaca)", tipo: "Ornamental", descricao: "Planta ornamental Resedá por estaca." },
  prod141: { nome: "Resedá (Sacolão)", tipo: "Ornamental", descricao: "Planta ornamental Resedá em sacolão." },
  prod142: { nome: "Samambaia", tipo: "Ornamental", descricao: "Planta ornamental Samambaia." },
  prod143: { nome: "Sapatinho de Judia", tipo: "Ornamental", descricao: "Planta ornamental Sapatinho de Judia." },
  prod144: { nome: "Sibipiruna (Sacolão)", tipo: "Ornamental", descricao: "Planta ornamental Sibipiruna em sacolão." },
  prod145: { nome: "Tumbergia Azul", tipo: "Ornamental", descricao: "Planta ornamental Tumbergia Azul." },
  prod146: { nome: "Tumbergia Amarela", tipo: "Ornamental", descricao: "Planta ornamental Tumbergia Amarela." },
  prod147: { nome: "Yuca (Sacolão)", tipo: "Ornamental", descricao: "Planta ornamental Yuca em sacolão." },
  prod148: { nome: "Yuca (Pote)", tipo: "Ornamental", descricao: "Planta ornamental Yuca em pote." },
  prod149: { nome: "Yuca Produzindo (1,5m)", tipo: "Ornamental", descricao: "Planta ornamental Yuca produzindo 1,5m." },
  prod150: { nome: "Yuca Produzindo (2,0m)", tipo: "Ornamental", descricao: "Planta ornamental Yuca produzindo 2,0m." },
    // ================= NATIVAS =================
  prod151: { nome: "Anjico Branco", tipo: "Nativa", descricao: "Muda de Anjico Branco." },
  prod152: { nome: "Anjico Vermelho", tipo: "Nativa", descricao: "Muda de Anjico Vermelho." },
  prod153: { nome: "Acácia Amarela", tipo: "Nativa", descricao: "Muda de Acácia Amarela." },
  prod154: { nome: "Acácia Rosa", tipo: "Nativa", descricao: "Muda de Acácia Rosa." },
  prod155: { nome: "Aroeira Pimenta", tipo: "Nativa", descricao: "Muda de Aroeira Pimenta." },
  prod156: { nome: "Aroeira do Sertão", tipo: "Nativa", descricao: "Muda de Aroeira do Sertão." },
  prod157: { nome: "Aroeira Preta", tipo: "Nativa", descricao: "Muda de Aroeira Preta." },
  prod158: { nome: "Aroeira Salsa", tipo: "Nativa", descricao: "Muda de Aroeira Salsa." },
  prod159: { nome: "Açoita Cavalo", tipo: "Nativa", descricao: "Muda de Açoita Cavalo." },
  prod160: { nome: "Barbatimão", tipo: "Nativa", descricao: "Muda de Barbatimão." },
  prod161: { nome: "Babosa Branca", tipo: "Nativa", descricao: "Muda de Babosa Branca." },
  prod162: { nome: "Cedro", tipo: "Nativa", descricao: "Muda de Cedro." },
  prod163: { nome: "Cabiuina", tipo: "Nativa", descricao: "Muda de Cabiuina." },
  prod164: { nome: "Copaíba", tipo: "Nativa", descricao: "Muda de Copaíba." },
  prod165: { nome: "Capororoca", tipo: "Nativa", descricao: "Muda de Capororoca." },
  prod166: { nome: "Cuiteira", tipo: "Nativa", descricao: "Muda de Cuiteira." },
  prod167: { nome: "Cagaita", tipo: "Nativa", descricao: "Muda de Cagaita." },
  prod168: { nome: "Canafístula", tipo: "Nativa", descricao: "Muda de Canafístula." },
  prod169: { nome: "Canjirana", tipo: "Nativa", descricao: "Muda de Canjirana." },
  prod170: { nome: "Canudo de Pito", tipo: "Nativa", descricao: "Muda de Canudo de Pito." },
  prod171: { nome: "Cupuaçu", tipo: "Nativa", descricao: "Muda de Cupuaçu." },
  prod172: { nome: "Dedaleiro", tipo: "Nativa", descricao: "Muda de Dedaleiro." },
  prod173: { nome: "Escumilha", tipo: "Nativa", descricao: "Muda de Escumilha." },
  prod174: { nome: "Escova de Macaco", tipo: "Nativa", descricao: "Muda de Escova de Macaco." },
  prod175: { nome: "Escova de Garrafa", tipo: "Nativa", descricao: "Muda de Escova de Garrafa." },
  prod176: { nome: "Farinha Seca", tipo: "Nativa", descricao: "Muda de Farinha Seca." },
  prod177: { nome: "Garapá", tipo: "Nativa", descricao: "Muda de Garapá." },
  prod178: { nome: "Guabiroba", tipo: "Nativa", descricao: "Muda de Guabiroba." },
  prod179: { nome: "Grumixama", tipo: "Nativa", descricao: "Muda de Grumixama." },
  prod180: { nome: "Guapuruvu", tipo: "Nativa", descricao: "Muda de Guapuruvu." },
  prod181: { nome: "Guanandi", tipo: "Nativa", descricao: "Muda de Guanandi." },
  prod182: { nome: "Imbaúba", tipo: "Nativa", descricao: "Muda de Imbaúba." },
  prod183: { nome: "Imbiruçu", tipo: "Nativa", descricao: "Muda de Imbiruçu." },
  prod184: { nome: "Ingá", tipo: "Nativa", descricao: "Muda de Ingá." },
  prod185: { nome: "Ipê Amarelo", tipo: "Nativa", descricao: "Muda de Ipê Amarelo." },
  prod186: { nome: "Ipê Roxo", tipo: "Nativa", descricao: "Muda de Ipê Roxo." },
  prod187: { nome: "Ipê Rosa", tipo: "Nativa", descricao: "Muda de Ipê Rosa." },
  prod188: { nome: "Ipê Branco", tipo: "Nativa", descricao: "Muda de Ipê Branco." },
  prod189: { nome: "Ipê Verde", tipo: "Nativa", descricao: "Muda de Ipê Verde." },
  prod190: { nome: "Jacarandá", tipo: "Nativa", descricao: "Muda de Jacarandá." },
  prod191: { nome: "Jequitibá Branco", tipo: "Nativa", descricao: "Muda de Jequitibá Branco." },
  prod192: { nome: "Jequitibá Rosa", tipo: "Nativa", descricao: "Muda de Jequitibá Rosa." },
  prod193: { nome: "Jatobá", tipo: "Nativa", descricao: "Muda de Jatobá." },
  prod194: { nome: "Mirindibá", tipo: "Nativa", descricao: "Muda de Mirindibá." },
  prod195: { nome: "Murici", tipo: "Nativa", descricao: "Muda de Murici." },
  prod196: { nome: "Mogno", tipo: "Nativa", descricao: "Muda de Mogno." },
  prod197: { nome: "Pau D’Alho", tipo: "Nativa", descricao: "Muda de Pau D’Alho." },
  prod198: { nome: "Pau Jacaré", tipo: "Nativa", descricao: "Muda de Pau Jacaré." },
  prod199: { nome: "Pau Viola", tipo: "Nativa", descricao: "Muda de Pau Viola." },
  prod200: { nome: "Pau Formiga", tipo: "Nativa", descricao: "Muda de Pau Formiga." },
  prod201: { nome: "Pau Pombo", tipo: "Nativa", descricao: "Muda de Pau Pombo." },
  prod202: { nome: "Pau Rei", tipo: "Nativa", descricao: "Muda de Pau Rei." },
  prod203: { nome: "Pau Marfim", tipo: "Nativa", descricao: "Muda de Pau Marfim." },
  prod204: { nome: "Pau Mulato", tipo: "Nativa", descricao: "Muda de Pau Mulato." },
  prod205: { nome: "Pau Brasil", tipo: "Nativa", descricao: "Muda de Pau Brasil." },
  prod206: { nome: "Paineira Rosa", tipo: "Nativa", descricao: "Muda de Paineira Rosa." },
  prod207: { nome: "Paineira Vermelha", tipo: "Nativa", descricao: "Muda de Paineira Vermelha." },
  prod208: { nome: "Pau Ferro", tipo: "Nativa", descricao: "Muda de Pau Ferro." },
  prod209: { nome: "Pequi", tipo: "Nativa", descricao: "Muda de Pequi." },
  prod210: { nome: "Papagaio", tipo: "Nativa", descricao: "Muda de Papagaio." },
  prod211: { nome: "Sucupira", tipo: "Nativa", descricao: "Muda de Sucupira." },
  prod212: { nome: "Sibipiruna", tipo: "Nativa", descricao: "Muda de Sibipiruna." },
  prod213: { nome: "Saboneteira", tipo: "Nativa", descricao: "Muda de Saboneteira." },
  prod214: { nome: "Sapucaia", tipo: "Nativa", descricao: "Muda de Sapucaia." },
  prod215: { nome: "Sangra D’Água", tipo: "Nativa", descricao: "Muda de Sangra D’Água." },
  prod216: { nome: "Vinhático", tipo: "Nativa", descricao: "Muda de Vinhático." },
  prod217: { nome: "Quaresmeira", tipo: "Nativa", descricao: "Muda de Quaresmeira." },
  prod218: { nome: "Tamboril", tipo: "Nativa", descricao: "Muda de Tamboril." },

};

const precos = {
  prod1: 40, prod2: 40, prod3: 40, prod4: 40, prod5: 40,
  prod6: 45, prod7: 40, prod8: 40, prod9: 40, prod10: 45,
  prod11: 40, prod12: 40, prod13: 40, prod14: 40, prod15: 40,
  prod16: 40, prod17: 40, prod18: 40, prod19: 55, prod20: 40,
  prod21: 40, prod22: 45, prod23: 40, prod24: 85, prod25: 45,
  prod26: 45, prod27: 45, prod28: 40, prod29: 40, prod30: 75,
  prod31: 105, prod32: 40, prod33: 40, prod34: 45, prod35: 40,
  prod36: 55, prod37: 105, prod38: 40, prod39: 40, prod40: 40,
  prod41: 40, prod42: 85, prod43: 40, prod44: 40, prod45: 40,
  prod46: 40, prod47: 255, prod48: 255, prod49: 125, prod50: 40,
  prod51: 40, prod52: 40, prod53: 40, prod54: 40, prod55: 45,
  prod56: 40, prod57: 45, prod58: 40, prod59: 45, prod60: 45,
  prod61: 40, prod62: 45, prod63: 40, prod64: 15, prod65: 45,
  prod66: 40, prod67: 45, prod68: 40, prod69: 45, prod70: 45,
  prod71: 40, prod72: 40, prod73: 40, prod74: 40, prod75: 45,
  prod76: 45, prod77: 40, prod78: 20, prod79: 16, prod80: 20,
  prod81: 40, prod82: 45, prod83: 40, prod84: 45, prod85: 40,
  prod86: 40, prod87: 40, prod88: 40, prod89: 40, prod90: 55,
  prod91: 85, prod92: 55, prod93: 40, prod94: 40, prod95: 55,
  prod96: 55, prod97: 40, prod98: 55, prod99: 40, prod100: 40,
  prod101: 40, prod102: 40, prod103: 40, prod104: 40, prod105: 40,
  prod106: 40, prod107: 40, prod108: 40, prod109: 55, prod110: 40,
  prod111: 40, prod112: 55, prod113: 255, prod114: 40, prod115: 40,
  prod116: 40, prod117: 45, prod118: 40, prod119: 40, prod120: 105,
  prod121: 155, prod122: 255, prod123: 40, prod124: 40, prod125: 185,
  prod126: 65, prod127: 40, prod128: 40, prod129: 40, prod130: 40,
  prod131: 40, prod132: 40, prod133: 40, prod134: 40, prod135: 40,
  prod136: 40, prod137: 40, prod138: 40, prod139: 40, prod140: 40,
  prod141: 40, prod142: 40, prod143: 40, prod144: 40, prod145: 40,
  prod146: 40, prod147: 40, prod148: 40, prod149: 40, prod150: 40,
  prod151: 20, prod152: 20, prod153: 20, prod154: 20, prod155: 20,
  prod156: 20, prod157: 20, prod158: 20, prod159: 20, prod160: 20,
  prod161: 20, prod162: 20, prod163: 20, prod164: 20, prod165: 20,
  prod166: 20, prod167: 20, prod168: 20, prod169: 20, prod170: 20,
  prod171: 20, prod172: 20, prod173: 20, prod174: 20, prod175: 20,
  prod176: 20, prod177: 20, prod178: 20, prod179: 20, prod180: 20,
  prod181: 20, prod182: 20, prod183: 20, prod184: 20, prod185: 20,
  prod186: 20, prod187: 20, prod188: 20, prod189: 20, prod190: 20,
  prod191: 20, prod192: 20, prod193: 20, prod194: 20, prod195: 20,
  prod196: 20, prod197: 20, prod198: 20, prod199: 20, prod200: 20,
  prod201: 20, prod202: 20, prod203: 20, prod204: 20, prod205: 20,
  prod206: 20, prod207: 20, prod208: 20, prod209: 20, prod210: 20,
  prod211: 20, prod212: 20, prod213: 20, prod214: 20, prod215: 20,
  prod216: 20, prod217: 20, prod218: 20,
  };

const produtosCompletos = Object.entries(produtos).map(([id, prod]) => {
  
    const imageName = getNormalizedFileName(prod.nome) + '.jpg'; 
    const imageUrl = getImageFromFileName(imageName);

    return {
        ...prod,
        id,
        preco: precos[id],
        imageUrl: imageUrl 
    };
});


const getCarrinhoInicial = () => {
    const savedCarrinho = localStorage.getItem("carrinhoDeCompras");
    try {
      return savedCarrinho ? JSON.parse(savedCarrinho) : [];
    } catch (e) {
      console.error("Erro ao carregar carrinho do localStorage:", e);
      return [];
    }
};

export function AbaPrincipal() {
    const navigate = useNavigate();
  const { atualizarPedido } = useContext(PedidoContext);
  
  
  const carrinhoInicial = getCarrinhoInicial();


  const [carrinho, setCarrinho] = useState(carrinhoInicial);
  

  const getQuantidadesIniciais = () => {
    return Object.keys(produtos).reduce((acc, id) => ({ ...acc, [id]: 1 }), {});
  };


  const [quantidades, setQuantidades] = useState(getQuantidadesIniciais); 


  const [pesquisa, setPesquisa] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filtro, setFiltro] = useState("Todos");
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  

  useEffect(() => {
    localStorage.setItem("carrinhoDeCompras", JSON.stringify(carrinho));
  }, [carrinho]);



  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  
  
  const alterarQuantidade = (id, valor) => {
    setQuantidades(prev => ({ 
      ...prev, 

      [id]: Math.max(1, (prev[id] || 0) + valor) 
    }));
  };

  const adicionarAoCarrinho = (id) => {
    const qtd = quantidades[id] || 1; 
    const produto = produtos[id];

    setCarrinho(prev => {
      const existe = prev.find(item => item.id === id);
      if (existe) {
        return prev.map(item => item.id === id ? { ...item, quantidade: item.quantidade + qtd } : item);
      }
      const novoCarrinho = [...prev, { 
        id,
        nome: produto.nome,
        preco: precos[id], 
        quantidade: qtd
      }];
   
      return novoCarrinho;
    });

  
    setQuantidades(prev => ({ ...prev, [id]: 1 }));
  };

  const diminuirQuantidadeCarrinho = (id) => {
    setCarrinho(prev =>
      prev.map(item => item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item)
          .filter(item => item.quantidade > 0)
    );
  };
  
  const totalUnidades = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const removerItem = (id) => setCarrinho(prev => prev.filter(item => item.id !== id));
  const limparCarrinho = () => setCarrinho([]);

  const finalizarPedido = () => {
    atualizarPedido({
      itens: carrinho,
      total: carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0)
    });

    navigate("/cep");
  };


  const produtosFiltrados = produtosCompletos.filter(prod => {
    const passaTipo = filtro === "Todos" || prod.tipo === filtro;
    const termo = pesquisa.trim().toLowerCase();
    const passaTexto =
      termo === "" ||
      prod.nome.toLowerCase().includes(termo) ||
      (prod.descricao || "").toLowerCase().includes(termo);

    return passaTipo && passaTexto;
});
  return (
    <div className="container">
      <header>
  <div className="cabecalho">
    <img src={logo} alt="Logo" />
    
    <div className="cabecalho-contatos">
      <h1>Contatos</h1>
      <ul className="contatos-lista">
        <li><a href="https://www.instagram.com/lucianoplantas2" target="_blank" rel="noopener noreferrer" className="contato-link insta"><FaInstagram /> Instagram</a></li>
        <li><a href="mailto:viveirosassoerodrigues@gmail.com" className="contato-link email"><FaRegEnvelope /> Email</a></li>
        <li><a href="https://www.facebook.com/share/15W5guHPr3/" target="_blank" rel="noopener noreferrer" className="contato-link facebook"><FaFacebookSquare /> Facebook</a></li>
      </ul>
    </div>
  </div>

  <nav>
    <ul className="nav-links">
      <li><Link to="/trabalho">Nosso Trabalho</Link></li>
      <li><Link to="/sobre">Sobre Nós</Link></li>
    </ul>
  </nav>
<div className="aviso-importante">
    <span className="aviso-icone">⚠️</span>
    <p>
        Aviso: Este site serve <strong> apenas para visualizar o catálogo de mudas e fazer o pedido que será enviado ao nosso WhatsApp.</strong> 
        Não há nenhum tipo de <strong>compra ou transação de pagamento através do site!</strong> 
    </p>
</div>
<div className="aviso-desconto">
   
  <span className="aviso-icone-desconto">🎁</span>
 <p>
  Na compra de <strong>200 mudas</strong>  você garante um super <strong>desconto especial</strong>  no seu pedido!
 </p>
</div>
</header>

      <main>
        <div className="main-header"><h1>Catálogo</h1></div>
        <div className="filtros">
          {["Todos","Frutífera","Nativa","Ornamental"].map(tipo => (
            <button key={tipo} className={`btn-filtro ${filtro===tipo?"ativo":""}`} onClick={()=>setFiltro(tipo)}>{tipo}</button>
          ))}
          <input
  type="search"
  placeholder="Pesquisar muda..."
  value={pesquisa}
  onChange={(e) => setPesquisa(e.target.value)}
  className="barra-pesquisa"
  aria-label="Pesquisar produtos"
/>
        </div>
        
        
        <div className="produtos">
          {produtosFiltrados.map(prod => (
            <div key={prod.id} className="card">
              
              <img src={prod.imageUrl} alt={prod.nome} className="card-imagem"onClick={() => handleOpenModal( prod )}/>
              <h3>{prod.nome}</h3>
              <p>{prod.descricao}</p>
              <div className="card-preco">R$ {prod.preco.toFixed(2)}</div>
              <div className="secao-compras">
                <div className="controles-quantidade">
                  <button onClick={()=>alterarQuantidade(prod.id,-1)}><FaMinus/></button>
                  <input type="number" min="1" value={quantidades[prod.id]} onChange={e=>setQuantidades(prev=>({...prev,[prod.id]:Math.max(1,parseInt(e.target.value)||1)}))}/>
                  <button onClick={()=>alterarQuantidade(prod.id,1)}><FaPlus/></button>
                </div>
                <button className="btn-adicionar" onClick={()=>adicionarAoCarrinho(prod.id)}><FaShoppingCart/> Adicionar</button>
              </div>
            </div>
          ))}
        </div>
        <ProductModal isOpen={isModalOpen} product={selectedProduct} onClose={handleCloseModal}/>
        {carrinho.length>0 && (
          <aside className="carrinho-flutuante">
            {!carrinhoAberto && (
              <button className="btn-icone-carrinho" onClick={()=>setCarrinhoAberto(true)}>
                <FaShoppingCart/>
                {carrinho.reduce((acc,item)=>acc+item.quantidade,0)>0 && <span className="badge">{carrinho.reduce((acc,item)=>acc+item.quantidade,0)}</span>}
              </button>
            )}
            {carrinhoAberto && (
              <div className="carrinho-aberto">
                <div className="carrinho-header">
                  <h2>Carrinho ({carrinho.reduce((acc,item)=>acc+item.quantidade,0)} itens)</h2>
                  <div className="carrinho-botoes-header">
                    <button className="btn-toggle" onClick={()=>setCarrinhoAberto(false)}><FaChevronDown/></button>
                    <button className="btn-lixo" onClick={limparCarrinho}><FaTrashAlt/></button>
                  </div>
                </div>
                <ul>
                  {carrinho.map(item=>(
                    <li key={item.id} className="item-carrinho">
                      <span className="item-carrinho-nome">{produtos[item.id].nome}</span>
                  <div className="item-carrinho-info">
                      <div className="item-carrinho-preco-quantidade">
                          <span className="item-carrinho-preco">R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                        <div className="acoes">
                         <button onClick={() => diminuirQuantidadeCarrinho(item.id)}><FaMinus /></button>
                         <span>x{item.quantidade}</span>
                         <button onClick={() => removerItem(item.id)}><FaTrashAlt /></button>
                      </div>
                    </div>
                  </div>
                </li>

                  ))}
                </ul>
                <div className="total">
                  Total: R$ {carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0).toFixed(2)}
                          {totalUnidades >= 200 && (
                              <span className="desconto-disponivel"> Desconto disponível !</span>
                        )}
                  </div>
                <button className="btn-comprar" onClick={finalizarPedido}><FaBolt/> Finalizar Pedido</button>
              </div>
            )}
          </aside>
        )}
      </main>
    </div>
  );
}
