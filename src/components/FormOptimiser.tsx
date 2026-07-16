import { useCallback, useMemo } from "react"
import { Controller, useForm } from "react-hook-form";
import { cpus, gpus, rams, ssds } from "../services/json/formData";



function FormOptimiser() {


    const {control,watch,handleSubmit} = useForm({
        defaultValues:{
             cpu: 0,
             gpu: 0,
             ram: 0,
             ssd: 0,
        }
    });

    const selectedCpu = watch("cpu");
    const selectedGpu = watch("gpu");
    const selectedRam = watch("ram");
    const selectedSsd = watch("ssd");

    const totalCost = useMemo(() => {
        const total = Number(selectedCpu) + Number(selectedGpu) + Number(selectedRam) + Number(selectedSsd)
        return total;
    },[selectedCpu,selectedGpu,selectedRam,selectedSsd]);

    const onSubmit = useCallback(() => {
        alert(`Total cost ${totalCost}`);
    },[totalCost]);

  return (
    <>
    <div className="w-full h-[100vh] bg-gray-950 flex justify-center items-center">
        <div className="bg-white w-[500px] h-[80vh] flex flex-wrap justify-center p-5 rounded-2xl">
            <h2 className="text-2xl font-semibold text-black">Desktop Configuration</h2>
            <div className="w-full h-[80%]">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="flex flex-wrap gap-1 items-center">
                        <label htmlFor="cpu" className="text-lg font-semibold">CPU</label>
                        <Controller name="cpu" control={control} render={({field}) => (
                            <select {...field} className="w-full h-[40px] border border-black/50 rounded-md">
                                <option value={0}>--Select an item--</option>
                            {cpus.map((option) => (
                                <option key={option.item} value={option.price}>{option.item}</option>
                            ))}
                            </select>
                        )} />
                    </div>

                    <div className="flex flex-wrap gap-1 items-center">
                        <label htmlFor="gpu" className="text-lg font-semibold">GPU</label>
                        <Controller name="gpu" control={control} render={({field}) => (
                            <select {...field} className="w-full h-[40px] border border-black/50 rounded-md">
                                <option value={0}>--Select an item--</option>
                            {gpus.map((option) => (
                                <option key={option.item} value={option.price}>{option.item}</option>
                            ))}
                            </select>
                        )} />
                    </div>

                    <div className="flex flex-wrap gap-1 items-center">
                        <label htmlFor="ram" className="text-lg font-semibold">RAM</label>
                        <Controller name="ram" control={control} render={({field}) => (
                            <select {...field} className="w-full h-[40px] border border-black/50 rounded-md">
                                <option value={0}>--Select an item--</option>
                            {rams.map((option) => (
                                <option key={option.item} value={option.price}>{option.item}</option>
                            ))}
                            </select>
                        )} />
                    </div>

                    <div className="flex flex-wrap gap-1 items-center">
                        <label htmlFor="ssd" className="text-lg font-semibold">SSD</label>
                        <Controller name="ssd" control={control} render={({field}) => (
                            <select {...field} className="w-full h-[40px] border border-black/50 rounded-md">
                                <option value={0}>--Select an item--</option>
                            {ssds.map((option) => (
                                <option key={option.item} value={option.price}>{option.item}</option>
                            ))}
                            </select>
                        )} />
                    </div>
                    <button type="submit" className="mt-[15px] bg-blue-600 w-full text-center py-2 rounded-md ">Proceed</button>
                </form>
            </div>
            <div className="w-full h-[10%] flex items-center justify-between">
                <p>Total Cost: {totalCost} Rupees</p>
                
            </div>
        </div>
    </div>
    </>
  )
}

export default FormOptimiser