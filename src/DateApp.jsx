function DateApp() {
  const today = new Date()

  return (
    <div>
      <p>{today.toLocaleDateString()}</p>
    </div>
  )
}

export default DateApp
