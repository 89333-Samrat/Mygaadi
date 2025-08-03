package com.mygaadi.mapper;

import com.mygaadi.dto.CarImageDTO;
import com.mygaadi.dto.CarResponseDTO;
import com.mygaadi.entities.Car;
import com.mygaadi.entities.Image;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

public class CarMapper {

    public static CarResponseDTO toDto(Car car) {
        CarResponseDTO dto = new CarResponseDTO();

        dto.setCarId(car.getCarId());
        dto.setBrand(car.getBrand());
        dto.setModel(car.getModel());
        dto.setVariant(car.getVariant());
        dto.setRegistrationYear(car.getRegistrationYear());
        dto.setOwnership(car.getOwnership());
        dto.setKmDriven(car.getKmDriven());
        dto.setLocation(car.getLocation());
        dto.setPrice(car.getPrice());
        dto.setRegistrationNumber(car.getRegistrationNumber());
        dto.setColor(car.getColor());
        dto.setInsuranceValid(car.isInsuranceValid());
        dto.setFuelType(car.getFuelType());
        dto.setTransmission(car.getTransmission());
        dto.setDescription(car.getDescription());
        dto.setCreatedAt(car.getCreatedAt());

        // 👇 FIX: Correctly handle image byte[] → base64
        if (car.getList() != null) {
            List<CarImageDTO> imageDTOs = car.getList().stream()
            		.map(image -> {
            		    CarImageDTO dtoImg = new CarImageDTO();
            		    try {
            		        dtoImg.setImagebase64(Base64.getEncoder().encodeToString(image.getImage()));
            		    } catch (Exception e) {
            		        dtoImg.setImagebase64(null);
            		    }
            		    return dtoImg;
            		})

                .collect(Collectors.toList());
            dto.setImages(imageDTOs);
        }

        return dto;
    }
}
