// i want to do this in such as way way where i can fetch all the chairDAta from the backend store them here and assign them to their respective const and then import them

const chairs = {
  bariatricChairs: [
    {
      _id: 1,
      tagId: "BR.30.18.16",
      type: "BARIATRIC",
      dimension: "30x18",
      status: { available: true, roomId: null },
    },
  ],
  standardChairs: [
    {
      _id: 2,
      tagId: "SD.20.18.16",
      type: "STANDARD",
      dimension: "20x18",
      status: { available: true, roomId: null },
    },
    {
      _id: 3,
      tagId: "SD.18.18.16",
      type: "STANDARD",
      dimension: "18x18",
      status: { available: true, roomId: null },
    },
    {
      _id: 4,
      tagId: "SD.20.17.16",
      type: "STANDARD",
      dimension: "20x17",
      status: { available: true, roomId: null },
    },
    {
      _id: 5,
      tagId: "SD.20.18.15",
      type: "STANDARD",
      dimension: "20x18",
      status: { available: true, roomId: null },
    },
    {
      _id: 6,
      tagId: "SD.20.18.16",
      type: "STANDARD",
      dimension: "20x18",
      status: { available: true, roomId: null },
    },
    {
      _id: 7,
      tagId: "SD.18.18.16",
      type: "STANDARD",
      dimension: "18x18",
      status: { available: true, roomId: null },
    },
    {
      _id: 8,
      tagId: "SD.20.17.16",
      type: "STANDARD",
      dimension: "20x17",
      status: { available: true, roomId: null },
    },
    {
      _id: 9,
      tagId: "SD.20.18.15",
      type: "STANDARD",
      dimension: "20x18",
      status: { available: true, roomId: null },
    },
    {
      _id: 10,
      tagId: "SD.20.18.16",
      type: "STANDARD",
      dimension: "20x18",
      status: { available: true, roomId: null },
    },
    // Add more chairs as needed...
  ],
  tiltInSpaceChairs: [
    {
      _id: 11,
      tagId: "TS.12.18.16",
      type: "TILTING",
      dimension: "12x18",
      status: { available: true, roomId: null },
    },
  ],
};

// const bariatricChairs = [
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
//   { _id: 234, tagId: "BR.20.18.16" },
// ];
// const standardChairs = [
//   { _id: 234, tagId: "chika" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "chika" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "chika" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "chika" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "chika" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "chika" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "chika" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
//   { _id: 234, tagId: "SD.20.18.16" },
// ];

// const tiltInSpaceChairs = [
//   { _id: 234, tagId: "TS.50.18.16" },
//   { _id: 234, tagId: "TS.20.18.16" },
//   { _id: 234, tagId: "TS.20.18.16" },
//   { _id: 234, tagId: "TS.20.18.16" },
//   { _id: 234, tagId: "TS.20.18.16" },
//   { _id: 234, tagId: "TS.50.18.16" },
//   { _id: 234, tagId: "TS.20.18.16" },
//   { _id: 234, tagId: "TS.20.18.16" },
//   { _id: 234, tagId: "TS.20.18.16" },
//   { _id: 234, tagId: "TS.20.18.16" },
// ];

export { chairs };

// trying to replicate what happend with chairData and current chair type
//currentChair
// chairData[currentChairType]
//chairData is what is holding all the chairs of each chair type (style)
// each time i clicked a chaitType(style) i set the state of chairType to the style currently selected and use that value to trigger a backect notation query on the chairdata object

// what i need now is to reserve the name 'type' as  a property in an objects e.type and tab_title: "TS",

/**
 const 
chose Chair Style
 CHAIR_TYPES.map which options i click on,
  --> e.tab_title
    ---> lead to tab names 
    onClick
      ---> setCurrentAvailebleDimentions(e.type) --> therfore CurrentAvailableDimensions should be a state with one value always 
      obj.STANDARD meaing Available Dimesions shoudl be a state
        --->  
choose Dimentions
  what shows
    ---> Dimensions is an object with three props whose values are objects and then subvalues are object data type and string dataType
      ---> Dimensions[CurrentAvailebleDimentions][AvailableDimensions]
        ---> spills out all the dimesions available in that chair Category Dimensions.STANDARDS[AvailableDimensions]=>[20x18", "16x16", "18x18", "18x16", "20x17"] needs to have 
          ---> STANDARDS prop in Dimensions needs to have have objects as a value 
            ---> {AvailableDimensions,type}
            ---> AvailableDimensions whose value is an array of 
              ---> Dimensions[CurrentAvailebleDimentions][AvailableDimensions]
      onClick 
        ----> needs to trigger the Available chairs based on Dimensions
        --> they type here is supped to be use to show availble chairs in the that dimensions 
        so 20x18x01, 20X18x02 etc
          ---> setSelctedChair[type]
            ---> selectedchairType will be a state whose value is a state 
            ---> chairData[SelectedChairType]
              ---> this triggers available chairs to show up in the 'available chairs based on criteria' sections

  
 Available Chair Based on Criteria 
  ----? chairData[SelectedChairType] 
  onClick will then allow FinalizeChair Assignment to be open for editing 
   object.currentChairType (Standard,Bariatric,Tilt) which will give us all the chairs of that type
 */

// const Dimensions = {
//   [STANDARD]: {
//     AvailableDimensions: ["...somthinggoes in here"],
//     type: [STANDARD],
//   },
//   [BARIATRIC]: bariatricChairs,
//   [TILTING]: tiltInSpaceChairs,
// };

// const {
//   StandardDimentions,
//   bariatricInSpaceDimentions,
//   tiltInSpaceDimentions,
// } = { ...chairDimensions };

/* {Dimensions[selectedDimension].map((e) => {
                      return (
                        <>
                          <Button
                            size="lg"
                            variant="secondary"
                            className="bg-[#8d9ab1]"
                            onClick={() => setSelctedChairType(e.type)}
                            key={e.type}
                          >
                            {e.size}
                          </Button>
                        </>
                      );
                    })} */

// current but in the app
/**
 when i click on the a chair type again then click on the chair dimensions of that type () the availbale chairs with that dimension shows up 
 if i click on the another chair type and i go back and click on the previour chair type not only does the chair dimensions show up but the available chairs show up immediately 
 after clicking on dimensions the ch
 */

/**
  from observarion the console.login is one step behind here
  becuase it is one step behind 
  */
