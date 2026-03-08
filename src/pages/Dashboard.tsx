import React from 'react';
import { useStore } from '../store/useStore';
import { Rocket, Users, Dog as DogIcon, Landmark } from 'lucide-react';

const Dashboard = () => {
  const { importBulkData, members, dogs, transactions } = useStore();

  const handleFullImport = () => {
    const data2026 = {
      members: [
        {"id": "A0134", "name": "HENONIN", "firstName": "Sylvie", "email": "sylviehenonin@laposte.net", "phone": "06 22 07 44 62", "address": "34 avenue Jules Verne", "cp": "49220", "city": "Le Lion d'Angers", "binome": ""},
        {"id": "A1927", "name": "DESHAYES", "firstName": "Norbert", "email": "norbertdeshayes44@gmail.com", "phone": "06 09 73 38 56", "address": "La Moinerie La Branchère", "cp": "44522", "city": "Mesanger", "binome": ""},
        {"id": "A1211", "name": "AUBIN", "firstName": "Mathis", "email": "mathis.aubin499@gmail.com", "phone": "06 72 70 24 34", "address": "33 bis chemin du Plessis", "cp": "49190", "city": "Denée", "binome": ""},
        {"id": "A1375", "name": "SUHARD", "firstName": "Pierre-Arnaud", "email": "pa.suhard@hotmail.fr", "phone": "06 46 18 17 10", "address": "440 chemin de la rouillère", "cp": "49220", "city": "Thorigné d'Anjou", "binome": ""},
        {"id": "A1203", "name": "LAGUESSE", "firstName": "Oliver", "email": "laguesse-oliver@hotmail.fr", "phone": "06 50 39 82 68", "address": "Les Champires", "cp": "49500", "city": "Chazé sur Argos", "binome": ""},
        {"id": "A1916", "name": "PLACAIS", "firstName": "Paméla", "email": "pamela.o@orange.fr", "phone": "06 13 27 78 64", "address": "37 avenue de la Liberté", "cp": "49370", "city": "le louroux", "binome": ""},
        {"id": "A1198", "name": "AUBIN", "firstName": "Frédéric", "email": "fred-aubin@orange.fr", "phone": "06 74 77 80 31", "address": "33 bis chemin du Plessis", "cp": "49190", "city": "Denée", "binome": ""},
        {"id": "A0027", "name": "DAUDIN", "firstName": "Séverine", "email": "sevbrosseau@aol.com", "phone": "06 24 41 73 68", "address": "12 route de St Clément", "cp": "49770", "city": "La Membrolle sur Longuénée", "binome": ""},
        {"id": "A0046", "name": "HAUTBOIS", "firstName": "Sophie", "email": "culleriersophie@gmail.com", "phone": "06 70 99 63 37", "address": "Le Prateau", "cp": "49220", "city": "Montreuil sur Maine", "binome": ""},
        {"id": "A0279", "name": "PICHON", "firstName": "Nicolas", "email": "nico.pichon70@gmail.com", "phone": "06 36 80 72 17", "address": "9 rue de la Fromenterie", "cp": "49500", "city": "ainte Gemmes d'Andigné", "binome": ""},
        {"id": "A0717", "name": "PLESSIS", "firstName": "Delphine", "email": "menardplessis49@aol.com", "phone": "06 32 41 20 28", "address": "13 rue de l'Aubépine", "cp": "49370", "city": "La Pouèze", "binome": ""},
        {"id": "A0724", "name": "BOULAY", "firstName": "Franck", "email": "franck.boulay0808@orange.fr", "phone": "06 47 17 19 08", "address": "6 avenue des Fresnes", "cp": "49370", "city": "Le Louroux Béconnais", "binome": ""},
        {"id": "ACV-2026-001", "name": "YASSA", "firstName": "Mahieddine", "email": "yassa.mahieddine@hotmail.fr", "phone": "07 67 81 80 68", "address": "5 avenue des Tilleuls", "cp": "49370", "city": "Béconles Granits", "binome": ""},
        {"id": "A1704", "name": "RONDEAU", "firstName": "Virginie", "email": "rondeau.virginie@gmail.com", "phone": "06 85 40 59 28", "address": "210 chemin des Friches", "cp": "49220", "city": "Thoringé d'Anjou", "binome": ""},
        {"id": "ACV-2026-002", "name": "PROHACZIK", "firstName": "Angela", "email": "angella.prohaczik@hotmail.com", "phone": "06 47 78 84 43", "address": "27 rue Pasteur", "cp": "49220", "city": "Vern d'Anjou", "binome": "GUESDON Clara"},
        {"id": "A0937", "name": "CHEVALIER", "firstName": "Guy Noël", "email": "gnkel@orange.fr", "phone": "06 85 41 05 58", "address": "10 rue de l'Ormeau", "cp": "49220", "city": "Grz Neuille", "binome": ""},
        {"id": "A0270 A0282", "name": "MARTORELLA", "firstName": "Christine", "email": "christine.martorella@orange.fr", "phone": "06 13 32 53 16", "address": "10 rue des Charmes", "cp": "49220", "city": "Brain sur Longuenee", "binome": "BRAEN"},
        {"id": "A0982 A0981", "name": "FILLODEAU", "firstName": "Clément", "email": "cfillodeau.mgiteau@gmail.com", "phone": "06 34 02 44 43", "address": "35 rue Ludovic Ménard", "cp": "49520", "city": "Noyant La Gravoyère", "binome": "GITEAU Maëva"},
        {"id": "A0957", "name": "BELLANGER", "firstName": "Stéphane", "email": "stephane.bellanger67@orange.fr", "phone": "06 40 21 10 76", "address": "La Pommeraie", "cp": "49220", "city": "Vern d'Anjou", "binome": ""},
        {"id": "ACV-2026-003", "name": "ONDOK", "firstName": "Zsuzsanna", "email": "angella.prohaczik@hotmail.com", "phone": "06 47 78 84 43", "address": "27 rue Pasteur", "cp": "49220", "city": "Vern d'Anjou", "binome": ""},
        {"id": "A0895", "name": "ANTIER", "firstName": "Marina", "email": "antier.marina@gmail.com", "phone": "06 01 19 77 38", "address": "5 La Poincière", "cp": "49170", "city": "St Germain des Prés", "binome": ""},
        {"id": "A0894", "name": "CHANTELOUP", "firstName": "Yasmine", "email": "opium1@live.fr", "phone": "06 50 15 48 81", "address": "Les Champires", "cp": "49500", "city": "Chazé sur Argos", "binome": ""},
        {"id": "A0932", "name": "CORBE", "firstName": "Sophie", "email": "sophieleblanc49@hotmail.com", "phone": "06 25 73 05 32", "address": "27 rte de Chateau Gontier", "cp": "49220", "city": "Le Lion d'Angers", "binome": ""},
        {"id": "A0399-A0467", "name": "TAFFIN", "firstName": "Sébastien", "email": "seba62350@hotmail.fr", "phone": "06 18 73 31 91", "address": "L'Etang", "cp": "53360", "city": "Quelaines St Gault", "binome": "DELIE Béatrice"},
        {"id": "A0372", "name": "GIRARD", "firstName": "Sophie", "email": "titisogirard@gmail.com", "phone": "06 17 19 32 12", "address": "2 La Recherie", "cp": "49440", "city": "Angrie", "binome": ""},
        {"id": "ACV-2026-004", "name": "MAKAROF", "firstName": "Georges", "email": "georges@makarof.fr", "phone": "", "address": "58 rue de l'Espérance", "cp": "44370", "city": "Montrelais", "binome": ""},
        {"id": "ACV-2026-005", "name": "MAKAROF", "firstName": "Christelle", "email": "christelle@makarof.fr", "phone": "06 31 22 00 41", "address": "28 grande Rue", "cp": "49410", "city": "St Florent le Vieil", "binome": ""},
        {"id": "ACV-2026-006", "name": "GUITTENY", "firstName": "Christelle", "email": "christellemis@hotmail.fr", "phone": "06 58 92 10 36", "address": "8 rue de l'Elantier", "cp": "49370", "city": "La Poueze", "binome": ""},
        {"id": "ACV-2026-007", "name": "VERNEAU", "firstName": "Claire", "email": "nous.verneau@yahoo.fr", "phone": "06 16 66 85 82", "address": "11 ure Simone Veil", "cp": "49220", "city": "Le Lion d'Angers", "binome": "David"},
        {"id": "ACV-2026-008", "name": "BELON", "firstName": "Elodie", "email": "elodie.bidaut@gmail.com", "phone": "06 68 99 33 16", "address": "80 rue Denis Papin", "cp": "49500", "city": "Ste Gemmes d'Andigné", "binome": ""},
        {"id": "ACV-2026-009", "name": "LAVALADE", "firstName": "Séréna", "email": "jeanmariexp@yahoo.fr", "phone": "06 87 82 47 33", "address": "47 rue de Maingué", "cp": "49500", "city": "Segré", "binome": ""},
        {"id": "ACV-2026-010", "name": "MORIN", "firstName": "Eléa", "email": "eleamorin94@gmail.com", "phone": "06 21 71 14 65", "address": "110 ld Les Treize Vents", "cp": "49370", "city": "Bécon les Granits", "binome": ""},
        {"id": "A0399", "name": "FEUILLET", "firstName": "Nicole", "email": "nclfeuillet@gmail.com", "phone": "06 20 36 90 72", "address": "20 rue des Fauvettes", "cp": "49520", "city": "Bouillé Ménard", "binome": ""},
        {"id": "ACV-2026-011", "name": "MENARD", "firstName": "Sophie", "email": "menard.sophie1301@gmail.com", "phone": "06 17 50 16 18", "address": "La Morinière Brain", "cp": "49220", "city": "Erdre en Anjou", "binome": ""},
        {"id": "A1649", "name": "NARDI", "firstName": "Franck", "email": "franck.nardi@live.fr", "phone": "06 21 15 46 63", "address": "4 allée de Rome", "cp": "49460", "city": "Montreuil Juigné", "binome": "Valérie"},
        {"id": "ACV-2026-012", "name": "LE CLEC'H", "firstName": "Pauline", "email": "pauline.aufevre@orange.fr", "phone": "07 80 82 46 74", "address": "La Serpolaine", "cp": "49220", "city": "Brain sur Longuenée", "binome": ""},
        {"id": "ACV-2026-013", "name": "DUDICOURT", "firstName": "Catherine", "email": "cathdudicourt@aol.com", "phone": "06 31 65 07 41", "address": "3 rue Flandres Dunkerque", "cp": "49220", "city": "Vern d'Anjou", "binome": "Rose"},
        {"id": "ACV-2026-014", "name": "UFFREDI", "firstName": "Marie Claire", "email": "lmparis@protonmail.com", "phone": "06 82 93 70 36", "address": "La Buardière", "cp": "49220", "city": "Erdre en Anjou", "binome": ""},
        {"id": "A0374", "name": "DE COUNE", "firstName": "Christophe", "email": "cdemails@yahoo.com", "phone": "06 01 77 81 00", "address": "12 bis rue de la Cure", "cp": "49220", "city": "Brain sur Longuenée", "binome": ""},
        {"id": "ACV-2026-015", "name": "CALVET", "firstName": "Miléna", "email": "milenaalvet44@gmail.com", "phone": "06 27 74 02 87", "address": "17 rue du Capitaine Maillard", "cp": "49330", "city": "Champigné", "binome": "CABANES Julien"},
        {"id": "A0394", "name": "CHAUVEAU", "firstName": "Maryline", "email": "maryline@yaat.org", "phone": "06 20 53 29 08", "address": "21 rue des Guerandais", "cp": "49370", "city": "St Clément de la Place", "binome": ""},
        {"id": "ACV-2026-016", "name": "MARTINEZ", "firstName": "Eva", "email": "eva.mr98@gmail.com", "phone": "06 77 05 43 00", "address": "3B rue André Brocheteau", "cp": "49500", "city": "Nyoiseau", "binome": ""},
        {"id": "ACV-2026-017", "name": "BELKHIRI", "firstName": "Mathieu", "email": "jadeweyers@gmail.com", "phone": "07 82 70 38 09", "address": "6485 route du Pressoir Bidault", "cp": "49500", "city": "Nyoiseau", "binome": "WEYERS Jade"},
        {"id": "A0383", "name": "DURAND", "firstName": "Valérie", "email": "valeriejeromedurand@gmail.com", "phone": "06 51 01 09 32", "address": "17 bis rue d'iNGRANDES", "cp": "49370", "city": "Le Louroux Béconnais", "binome": ""},
        {"id": "ACV-2026-018", "name": "HUET", "firstName": "Justine", "email": "david.lucie0212@orange.fr", "phone": "06 75 97 49 24", "address": "44 La Pironnaie", "cp": "49220", "city": "Vern d'Anjou", "binome": ""},
        {"id": "ACV-2026-019", "name": "GROS", "firstName": "Anthony", "email": "grosanthony@gmail.com", "phone": "06 22 46 48 48", "address": "8 rue Victor Lassalle", "cp": "49440", "city": "Candé", "binome": "DE KEGUELIN Cathy"},
        {"id": "A0384", "name": "PAILLARD", "firstName": "Sophie", "email": "soph_paillard@yahoo.com", "phone": "06 03 86 12 96", "address": "", "cp": "", "city": "", "binome": ""},
        {"id": "ACV-2026-020", "name": "MULLER", "firstName": "Aurélien", "email": "aurelien.muller@outlook.com", "phone": "06 47 25 91 85", "address": "191 rue des Haies", "cp": "44370", "city": "Varades", "binome": "LOKAU Jula"},
        {"id": "ACV-2026-021", "name": "DEROUET", "firstName": "Fabien", "email": "fada.derouet@gmail.com", "phone": "06 71 63 00 95", "address": "12 rue du Pré Valau", "cp": "49220", "city": "Grez Neuville", "binome": "DEROUET Audrey"},
        {"id": "A0406-A0405", "name": "MARTIN/BELLIER", "firstName": "francois-xavier/virginie", "email": "fxvmartinbellier@gmail.com", "phone": "", "address": "2465 route de la Forêt de  Longuenée", "cp": "49220", "city": "Grez Neuville", "binome": ""},
        {"id": "ACV-2026-022", "name": "TERPEREAU", "firstName": "Oriana", "email": "ariana2004@orange.fr", "phone": "06 64 15 01 42", "address": "5 avenue de Croissel", "cp": "49440", "city": "La Cornuaille", "binome": "LENOIR Alexandre"},
        {"id": "ACV-2026-023", "name": "GUET", "firstName": "Caroline", "email": "dguet@wanadoo.fr", "phone": "06 22 03 29 52", "address": "La Neustaie", "cp": "49440", "city": "Angrie", "binome": "David"},
        {"id": "ACV-2026-024", "name": "MAUDET", "firstName": "Johan", "email": "johanmaudet@gmail.com", "phone": "06 51 64 11 46", "address": "17 rue de la Gare", "cp": "49170", "city": "La Membrolle", "binome": "BERNARD Lolita"},
        {"id": "ACV-2026-025", "name": "PASQUIER", "firstName": "Fabrice", "email": "pasquier.fabrice0692@orange.fr", "phone": "06 84 54 79 45", "address": "13 rue Blaise Pascal", "cp": "49220", "city": "Vern d'Anjou", "binome": "Kenza"},
        {"id": "ACV-2026-026", "name": "DUPONT", "firstName": "Amandine", "email": "", "phone": "06 33 17 76 47", "address": "", "cp": "", "city": "", "binome": ""}
      ],
      dogs: [
        {"name": "NELSON", "breed": "Berger allemand", "chip": "250269500747214", "ownerId": "A1927"},
        {"name": "U'TARA", "breed": "Beauceron", "chip": "250269610599956", "ownerId": "A1211"},
        {"name": "RIO", "breed": "Tervueren", "chip": "250269608736857", "ownerId": "A1375"},
        {"name": "TAL", "breed": "Labrador", "chip": "250269590719226", "ownerId": "A1916"},
        {"name": "TAIKO", "breed": "Tervuren", "chip": "250269610570778", "ownerId": "A1198"},
        {"name": "OSLO", "breed": "Labrador", "chip": "250269591072541", "ownerId": "A0027"},
        {"name": "UMMY", "breed": "Berger australien", "chip": "250269591139218", "ownerId": "A0046"},
        {"name": "MAYA", "breed": "Boder Collie", "chip": "250269591052436", "ownerId": "A0279"},
        {"name": "ULYSSE", "breed": "Springer", "chip": "250269610861019", "ownerId": "A0717"},
        {"name": "UPSY", "breed": "Golden", "chip": "250269590999766", "ownerId": "A0724"},
        {"name": "RUBEN", "breed": "Berger Allemand", "chip": "1B AL 771661", "ownerId": "ACV-2026-001"},
        {"name": "R'HAPPY", "breed": "Berger australien", "chip": "250269590104757", "ownerId": "A1704"},
        {"name": "URYON", "breed": "Whippet", "chip": "250268780944607", "ownerId": "ACV-2026-002"},
        {"name": "VAIA", "breed": "Epagneul Breton", "chip": "250268781122788", "ownerId": "A0937"},
        {"name": "VANDA", "breed": "Berger Australien", "chip": "250268781394067", "ownerId": "A0270 A0282"},
        {"name": "KIRA", "breed": "Labrador", "chip": "250269591373662", "ownerId": "A0982 A0981"},
        {"name": "VAYA", "breed": "Beauceron", "chip": "250268781484562", "ownerId": "A0957"},
        {"name": "SANYI", "breed": "Caniche", "chip": "250269591817326", "ownerId": "ACV-2026-003"},
        {"name": "VAIANA", "breed": "Golden", "chip": "250269591829531", "ownerId": "A0895"},
        {"name": "TYBEUR", "breed": "Bouvier Australien", "chip": "", "ownerId": "A0894"},
        {"name": "VICKY", "breed": "Berger Australien", "chip": "250265610983639", "ownerId": "A0932"},
        {"name": "VENOM", "breed": "berger allemand", "chip": "250269591298919", "ownerId": "A0399-A0467"},
        {"name": "AMBRE", "breed": "Berger Allema,d", "chip": "250268900018947.0", "ownerId": "A0399-A0467"},
        {"name": "CHARLIE", "breed": "Altdeutsch", "chip": "250269611126362", "ownerId": "A0372"},
        {"name": "AIKO", "breed": "berger allemand", "chip": "250268781681767", "ownerId": "ACV-2026-004"},
        {"name": "VOLT", "breed": "Bouledogue Français", "chip": "250269591046197", "ownerId": "ACV-2026-005"},
        {"name": "AAROS", "breed": "Bouledogue Français", "chip": "", "ownerId": "ACV-2026-006"},
        {"name": "VOLT'AIR", "breed": "Golden", "chip": "250268781401300", "ownerId": "ACV-2026-007"},
        {"name": "VAIA", "breed": "Berger Australien", "chip": "250269591956884", "ownerId": "ACV-2026-008"},
        {"name": "MAYA", "breed": "Malinois", "chip": "250269610340918", "ownerId": "ACV-2026-009"},
        {"name": "ASHKA", "breed": "Berger Allemand", "chip": "250269611440653", "ownerId": "ACV-2026-010"},
        {"name": "OLYMPE", "breed": "Epagneul", "chip": "250268600186903", "ownerId": "A0399"},
        {"name": "USKO", "breed": "Berger Australien", "chip": "250269591043570", "ownerId": "ACV-2026-011"},
        {"name": "PIXIE", "breed": "Berger Australien", "chip": "250269608404064", "ownerId": "A1649"},
        {"name": "VAIKA", "breed": "Spitz Allemand", "chip": "250269591394653.0", "ownerId": "A1649"},
        {"name": "UMI", "breed": "Golden", "chip": "250269610919804", "ownerId": "ACV-2026-012"},
        {"name": "PRUNE", "breed": "Ratier", "chip": "250269590408055", "ownerId": "ACV-2026-013"},
        {"name": "UTWO", "breed": "Terrier/Jack", "chip": "250269591508183", "ownerId": "ACV-2026-014"},
        {"name": "YUKI", "breed": "Malinois", "chip": "250269591549245", "ownerId": "A0374"},
        {"name": "NAIKI", "breed": "Malinois", "chip": "", "ownerId": "A0374"},
        {"name": "ARYA", "breed": "Berger Allemand", "chip": "250269592034667", "ownerId": "ACV-2026-015"},
        {"name": "AERYN", "breed": "Samsky", "chip": "250268781847560", "ownerId": "A0394"},
        {"name": "AARYAN", "breed": "Staffie+chien de chasse", "chip": "250269591486153", "ownerId": "ACV-2026-016"},
        {"name": "A'TSUKI", "breed": "Berger Australien", "chip": "250268781887161", "ownerId": "ACV-2026-017"},
        {"name": "ATLAS", "breed": "Beauceron", "chip": "", "ownerId": "A0383"},
        {"name": "VELOURS", "breed": "Spitz", "chip": "250268781579471", "ownerId": "ACV-2026-018"},
        {"name": "ARKANE", "breed": "Beauceron", "chip": "250269611602051", "ownerId": "ACV-2026-019"},
        {"name": "RUSHKA", "breed": "Spitz", "chip": "", "ownerId": "A0384"},
        {"name": "AZRA", "breed": "Golden", "chip": "250269592038773", "ownerId": "ACV-2026-020"},
        {"name": "AMANDE", "breed": "Beagle", "chip": "250269591459224", "ownerId": "ACV-2026-021"},
        {"name": "APACH", "breed": "Border Collie", "chip": "250269591459443", "ownerId": "A0406-A0405"},
        {"name": "DOUDOU", "breed": "Inconnue", "chip": "", "ownerId": "ACV-2026-022"},
        {"name": "YUNA", "breed": "Inconnue", "chip": "", "ownerId": "ACV-2026-022"},
        {"name": "VENUS", "breed": "Golden", "chip": "250269591021626", "ownerId": "ACV-2026-023"},
        {"name": "ALASKA", "breed": "Golden", "chip": "250269591479499.0", "ownerId": "ACV-2026-023"},
        {"name": "ACE", "breed": "Berger Australien", "chip": "250269591472375", "ownerId": "ACV-2026-024"},
        {"name": "ALVIN", "breed": "Jack Russel", "chip": "250269101373002", "ownerId": "ACV-2026-025"}
      ]
    };

    if(window.confirm(`Vous allez importer ${data2026.members.length} membres et ${data2026.dogs.length} chiens. Confirmer ?`)) {
      importBulkData(data2026);
    }
  };

  const stats = [
    { label: 'Membres Actifs', value: members.length, icon: <Users />, color: 'bg-emerald-500' },
    { label: 'Le Parc Canin', value: dogs.length, icon: <DogIcon />, color: 'bg-blue-500' },
    { label: 'Trésorerie', value: '0 €', icon: <Landmark />, color: 'bg-slate-900' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800">
            Tableau de Bord
          </h2>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
            Amicale Canine Vernoise - Session 2026
          </p>
        </div>
        
        {/* BOUTON D'IMPORTATION MAGIC */}
        <button 
          onClick={handleFullImport}
          className="flex items-center gap-3 px-6 py-4 bg-amber-500 text-white rounded-2xl font-black uppercase italic text-xs tracking-widest shadow-xl shadow-amber-100 hover:scale-105 transition-all"
        >
          <Rocket size={20} />
          Importer Base 2026
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
            <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-800 tracking-tighter italic">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
