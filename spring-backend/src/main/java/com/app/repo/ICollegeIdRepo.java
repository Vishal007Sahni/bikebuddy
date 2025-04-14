package com.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.CollegeId;

public interface ICollegeIdRepo extends JpaRepository<CollegeId, Integer> {
    @Query("SELECT COUNT(c) > 0 FROM CollegeId c WHERE LOWER(c.uniqueId) = LOWER(:uniqueId)")
    boolean existsByUniqueId(String uniqueId);
}
