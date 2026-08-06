---
_schema: default
title: New Patient Special
pageSections:
  - _component: page-sections/heroes/hero-split
    eyebrow: New Patients Welcome • Same-Day Appointments Available
    heading: Your City's Top-Rated Dental Experts
    subtext: >-
      Comprehensive dental care for the whole family. New patient specials
      available. Call us today to schedule.
    imageSource: /src/assets/images/index-meet.webp
    imageAlt: Our dental office
    imageAspectRatio: portrait
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: Book Appointment
        hideText: false
        link: '#contact'
        iconName: ''
        iconPosition: before
        variant: primary
        size: md
      - _component: building-blocks/core-elements/button
        text: (555) 555-5555
        hideText: false
        link: tel:+15555555555
        iconName: ''
        iconPosition: before
        variant: secondary
        size: md
    reverse: false
    colorScheme: default
    backgroundColor: '#2d2727'
  - _component: page-sections/features/feature-grid
    eyebrow: Why Choose Us
    heading: 3 Great Reasons to Choose Us
    subtext: ''
    gap: ''
    minItemWidth: 280
    maxItemWidth: 361
    features:
      - _component: page-sections/features/feature-grid/feature-item
        title: New Patient Special
        description: >-
          New patients receive a special offer on their first visit. Ask us for
          details when you call.
        iconName: bolt
        iconColor: blue
      - _component: page-sections/features/feature-grid/feature-item
        title: Flexible Scheduling
        description: >-
          Early morning, evening, and same-day appointments available to fit
          your busy schedule.
        iconName: paint-brush
        iconColor: yellow
      - _component: page-sections/features/feature-grid/feature-item
        title: Comprehensive Exam and X-Rays
        description: >-
          Thorough evaluation of your teeth, gums, and jaw using the latest
          digital technology.
        iconName: cube
        iconColor: green
    colorScheme: default
    backgroundColor: '#000000'
    align: center
  - _component: page-sections/features/feature-split
    eyebrow: Your First Visit
    heading: What Happens During Your First Visit
    subtext: >-
      We take time to get to know you and understand your dental needs. Here is
      what you can expect when you visit us for the first time.
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: Book Your First Visit
        hideText: false
        link: '#contact'
        iconName: ''
        iconPosition: before
        variant: primary
        size: md
    imageSource: /src/assets/images/placeholder-office.jpg
    imageAlt: Doctor with patient
    imageAspectRatio: portrait
    imageRounded: true
    reverse: true
    colorScheme: default
    backgroundColor: base
  - _component: page-sections/info-blocks/insurance-block
    eyebrow: ''
    heading: Dental Insurance Welcome
    subtext: >-
      If you have dental insurance, you'll be able to get the most out of your
      benefits when you visit us! We're proudly in-network with major PPO plans,
      including Cigna and Delta Dental Premier. We also offer an in-house
      membership plan, flexible financing, and even specials throughout the
      year. No matter what treatment you need, we can make paying for it
      convenient and hassle-free.
    insurance:
      aetna: true
      careington: true
      deltaDentalPremier: true
      cigna: true
      unitedHealthcare: true
      bcbs: true
      principal: true
      sunLife: true
    plusManyMore: true
    note: >-
      Note: If you do not see your plan, do not worry. Call. We welcome other
      plans.
    logoHeight: 56
    colorScheme: default
    backgroundColor: surface
    paddingVertical: 4xl
  - _component: page-sections/people/testimonial-section
    text: >-
      The team made my visit a breeze. From the first call to post-treatment,
      they were friendly, efficient, and caring.
    authorName: Happy Patient
    authorDescription: Verified Google Review
    authorImage: /src/assets/images/placeholder-team.jpg
    alignX: center
    maxContentWidth: xl
    paddingHorizontal: xl
    paddingVertical: sm
    colorScheme: default
    backgroundColor: surface
    eyebrow: Top-Rated on Google
    heading: What Our Patients Say
  - _component: page-sections/ctas/cta-form
    heading: Request Your Appointment
    subtext: >-
      Fill out the form below and our team will reach out to confirm your
      appointment, or call us directly.
    formAction: ./
    formBlocks:
      - _component: building-blocks/forms/input
        label: Full Name
        name: name
        type: text
        required: true
      - _component: building-blocks/forms/input
        label: Phone Number
        name: phone
        type: tel
        required: true
      - _component: building-blocks/forms/input
        label: Email
        name: email
        type: email
        required: false
      - _component: building-blocks/forms/submit
        text: Request Appointment
        variant: primary
        size: md
        iconPosition: before
        hideText: false
        disabled: false
    imageSource: /src/assets/images/index-banner-a-1.webp
    imageAlt: Our friendly team
    reverse: false
    colorScheme: inherit
    backgroundColor: surface
    id: contact
  - _component: page-sections/ctas/cta-center
    heading: Ready to Book Your Appointment?
    subtext: >-
      New patient specials available. Same-day appointments frequently
      available. Call us or book online today.
    buttonSections:
      - _component: building-blocks/core-elements/button
        text: Book Appointment
        hideText: false
        link: '#contact'
        iconName: ''
        iconPosition: before
        variant: primary
        size: md
      - _component: building-blocks/core-elements/button
        text: (555) 555-5555
        hideText: false
        link: tel:+15555555555
        iconName: ''
        iconPosition: before
        variant: tertiary
        size: md
    colorScheme: inherit
    backgroundColor: accent
    rounded: false
description: >-
  Comprehensive dental care for the whole family. New patient specials and
  same-day appointments available.
---
