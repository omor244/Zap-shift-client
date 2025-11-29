import icon from '../../../assets/service.png'



const OurServesesCard = ({ item }) => {
    console.log(item)
    const { title, description } = item
    return (
        <div className="text-center rounded-3xl">
            
              <div className="hover-3d hover:bg-primary bg-white h-[300px] p-6 rounded-2xl">
                        <div className="space-y-3">
                            <img className='mx-auto' src={icon} alt="" />
                            <p className="text-2xl font-bold ">{title}</p>
                    <p className="font-medium">{ description }</p>
                          </div>
                    </div>
        </div>
    );
};

export default OurServesesCard;